import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        
    },
    async signIn({ profile }) {
        try {
            //serverLess -> Lambda -> dynamodb
            // opens up only when called, spins up server and connects to it when called
            await connectToDB();
            //check if a user already exists


            //if not, create a new user and save to DB

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

})

export { handler as GET, handler as POST };