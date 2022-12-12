import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as Api from "../../../lib/api";







export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        let res = await Api.signIn(credentials as Api.LoginUserInput);
        if (res.error) {
          throw new Error(res.error);
        }
        let { data: { user }, error } = await Api.me(res.data.token);
        if (error) {
          throw new Error(error);
        }
        return { ...user, token: res.data.token };
      }
    }),
    CredentialsProvider({
      id: "signup",
      name: "Signup",
      type: "credentials",
      credentials: {
        email: { label: "Email", "type": "email", placeholder: "username" },
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        let res = await Api.signUp(credentials as Api.RegisterUserInput);
        if (res.error) {
          throw new Error(res.error);
        }
        let { data: { user }, error } = await Api.me(res.data.token);
        if (error) {
          throw new Error(error);
        }
        return { ...user, token: res.data.token };
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user && user.token != "") {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      session.user = {
        username: token.name || "",
        email: token.email || "",
        sub: token.sub || "",
      };
      session.token = token.accessToken as string || "";
      return session;
    },
    async jwt({ user, token }) {
      console.log("jwt");
      console.log(token);
      if (user && user.token != null) {
        token.name = user.username;
        token.accessToken = user.token;
      }
      return token;
    }
  }
})
