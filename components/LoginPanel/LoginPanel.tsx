import styles from './loginPanel.module.css'

export default function LoginPanel({ children }: { children?: React.ReactNode }) {
  return (
  <section className={`${styles.loginPanelShadow} w-auto md:w-[520px] bg-white p-[6px] rounded-[40px]`}>
    <div className={`${styles.loginPanelBg} p-10 rounded-[34px]`}>
      {children}
    </div>
  </section >
  )
}