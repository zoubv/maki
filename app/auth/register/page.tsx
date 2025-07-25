import { AuthForm } from "@/components/auth-form"
import { register } from "@/lib/actions/auth"

export default function RegisterPage() {
  return <AuthForm type="register" action={register} />
}
