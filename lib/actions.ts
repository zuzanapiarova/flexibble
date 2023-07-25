import { createUserMutation, getUserQuery } from '@/graphql';
import { GraphQLClient } from 'graphql-request'

// we need to do this because our app needs to run correctly on localhost and on production environment
const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL ||''
                            : 'http://127.0.0.1:4000/graphql';              
const apiKey = isProduction ? process.env.NEXT_GRAFBASE_PUBLIC_API_KEY || '' : 'innnnnnn';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'https://localhost:3000'
const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query:string, variables = {}) => {
    try{
        return await client.request(query, variables);
    }
    catch(error){
        throw error;
    }
}

export const getUser = (email: string) => {
    return makeGraphQLRequest( getUserQuery, { email })
}

export const createUser = (name: string, email: string, avatarUrl: string ) => {
    const variables = {
        input: {
            name, email, avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation, variables)

}
