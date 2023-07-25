import { getServerSession } from 'next-auth/next'
import { NextAuthOptions, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { SessionInterface, UserProfile } from '@/common.types'
import { createUser, getUser } from './actions'

export const AuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ], 
    /*jwt: {
        encode: ({secret, token}) => {}, 
        decode: async ({secret, token}) => {} 
    },*/ 
    theme: {
        colorScheme: 'light', 
        logo: '/logo.png'
    }, 
    //callbacks are very important here in the session.ts file !!!
    callbacks: {
        // this function is going to get triggered every time the user visits the page
        async session({session}) {
            const email = session?.user?.email as string;
            try{
                const data = getUser(email) as {user? : UserProfile}
                const newSession = {
                    ...session, 
                    user: {
                        ...session.user, 
                        ...data?.user
                    }
                }
                return newSession
            }
            catch(error){
                console.log('Error retrieving user data', error);
                return session;
            }
        }, 
        async signIn({ user }: {
            user: AdapterUser | User
          }) {
            try{ 
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }
        
            if (!userExists.user) {
                await createUser(user.name as string, user.email as string, user.image as string)
            }
            return true;
            }
            catch(error: any){
                console.log('error: user does not exist');
                return false;
            }
        }
    }
} 

export async function getCurrentUser() {
    const session = await getServerSession(AuthOptions) as SessionInterface;
  
    return session;
  }
