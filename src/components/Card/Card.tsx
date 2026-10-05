import styles from './Card.module.css'

interface CardProps {
  title?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}

export default function Card({ title, action, children }: CardProps) {
  return (
    <section className={styles.card} aria-label={title ? String(title) : undefined}>
      {title && (
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{title}</h2>
          {action}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  )
}
