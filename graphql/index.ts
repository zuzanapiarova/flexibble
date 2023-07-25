//here we will write all of our queries to graphql
//the structure is a regular graphql structure 

export const getUserQuery = `query GetUser($email: String!){
                                user(by:  { email: $email }){
                                    id
                                    name
                                    email
                                    avatarUrl
                                    description githubUrl
                                    linkedInUrl
                                }
}`

export const createUserMutation = ` mutation CreateUser($input: UserCreateInput!){
                                        userCreate(input: $input){
                                            user{
                                                name
                                                email
                                                avatarUrl
                                                description
                                                githubUrl
                                                linkedInUrl
                                                id
                                            }
                                        }
}` 