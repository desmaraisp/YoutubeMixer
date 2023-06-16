import { getAuthOptions } from "@/auth-options"
import NextAuth from "next-auth"

export default NextAuth(getAuthOptions())