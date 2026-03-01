import styles from './loginPanel.module.css'

export default function LoginPanel({ children }: { children?: React.ReactNode }) {
  return (
  <section className={styles.loginPanelShadow}>
    <div className={styles.loginPanelBg}>
      {children}
    </div>
  </section>
  )
}