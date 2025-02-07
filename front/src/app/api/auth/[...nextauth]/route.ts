import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { loginUser } from "@/app/services/auth";
console.log("Cargando archivo de configuración de NextAuth");

interface Token extends JWT {
  id?: string;
  email?: string;
}
interface SessionInterface extends Session {
  user: {
    id?: string;
    email?: string;
  };
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@gmail..com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Credenciales no proporcionadas");
          }

          const { email, password } = credentials;
          console.log("🔹 Autorizando usuario:", email);

          const res = await loginUser(email, password);

          if (!res?.data || !res.data.accessToken) {
            throw new Error("Usuario no encontrado o token no recibido");
          }

          return {
            id: res.data.id,
            email: res.data.email,
            accessToken: res.data.accessToken,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              " Error en autorización:",
              error.response?.data || error.message
            );
          } else {
            console.error(" Error en autorización:", (error as Error).message);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as Token).id = user.id;
        if (user.email) {
          (token as Token).email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as SessionInterface).user.id = (token as Token).id;
        (session as SessionInterface).user.email = (token as Token).email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
