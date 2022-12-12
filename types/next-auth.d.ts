
import NextAuth from "next-auth"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Profile
  }

  interface User {
    id: string,
    username: string,
    email: string,
    provider: string,
    token: string,
    created_at: Date,
    updated_at: Date
  }

  interface Profile {
    username: string,
    email: string,
  }
}
