import { LoginForm } from "@/components/LoginForm";

import { Logo } from "@/shared/ui/Logo";
import { LoginPanel } from "@/shared/ui/LoginPanel";

export default function LoginPage() {
  return (
    <LoginPanel>
      <Logo className="m-auto mb-5"/>
      <h1 className="text-[40px] text-center">Добро пожаловать!</h1>
      <p className="text-xl text-center">Пожалуйста, авторизируйтесь</p>
      <LoginForm />
    </LoginPanel>
  )
}