import { GraphQLClient } from "graphql-request";

import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql";
import { ProjectForm } from "@/common.types";
import { POST } from "@/app/api/upload/route";

// we need to do this because our app needs to run correctly on localhost and on production environment
const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'innnnnnn';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
      return await client.request(query, variables);
    } catch (err) {
      throw err;
    }
  };

  export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
  };

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apiKey);
  
    const variables = {
      input: {
        name: name,
        email: email,
        avatarUrl: avatarUrl
      },
    };
    
    return makeGraphQLRequest(createUserMutation, variables);
  };

  //uploading the images to the cloudinary server
  const uploadImage = async (imagePath: string) => {
    try{
      const response = fetch(`${serverUrl}/api/upload`, { 
                        method: 'POST', 
                        body: JSON.stringify({path: imagePath})})
    }
    catch(error){
      throw error;
    }
  }

  export const fetchToken = async () => {
    try{
      const response = await fetch(`${serverUrl}/api/auth/token`);
      return response.json();
    }
    catch(error){
      throw error;
    }
  }

  export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){

      client.setHeader('Authorization', `Bearer ${token}`)

      const variables = {
        input: {
          ...form, 
          image: imageUrl.url, 
          createdBy: {
            link: creatorId
          }
        }
      }
      
      return makeGraphQLRequest( createProjectMutation, variables)
    }
    
  }