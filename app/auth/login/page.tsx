import { AuthForm } from "@/components/auth-form"
import { authenticate } from "@/lib/actions/auth"

export default function LoginPage() {
  return <AuthForm type="login" action={authenticate} />
}
