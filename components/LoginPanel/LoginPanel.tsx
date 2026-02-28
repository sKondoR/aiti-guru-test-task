import styles from './loginPanel.module.css'

export default function LoginPanel({ children }: { children?: React.ReactNode }) {
  return (
  <section className={`w-auto md:w-[520px] bg-white p-[6px] rounded-[40px] ${styles.loginPanelShadow}`}>
    <div className={`p-10 rounded-[34px] ${styles.loginPanelBg}`}>
      {children}
    </div>
  </section >
  )
}