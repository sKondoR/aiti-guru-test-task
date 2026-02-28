import { Logo } from "@/components/layout/Logo";
import { LoginPanel } from "@/components/LoginPanel";

export default function LoginPage() {
  return (
    <LoginPanel>
      <Logo className="m-auto mb-5s"/>
      <h1 className="text-[40px] text-center">Добро пожаловать!</h1>
      <p className="text-xl text-center">Пожалуйста, авторизируйтесь</p>
    </LoginPanel>
  )
}