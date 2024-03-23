import { AuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const API_KEY = process.env.FIREBASE_API_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" }
        })
        const usuario = await response.json()
          if (response.ok) {
            return usuario;
          }
          return null;
        }
    }),
  ],
  
  callbacks: {
    async session({ session, token}) {
      session.user = { ...session.user, id: token.id || token.sub } as {
        id: string,
        name: string;
        email: string;
      }
      return session;
    },
  },
}