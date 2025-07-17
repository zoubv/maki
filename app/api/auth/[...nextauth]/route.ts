import NextAuth from "next-auth" // Import NextAuth default
import { authConfig } from "@/lib/auth" // Import the authConfig

const handler = NextAuth(authConfig) // Create the handler instance

// Directly re-export GET and POST from the handlers object in lib/auth
export { GET, POST } from "@/lib/auth"
