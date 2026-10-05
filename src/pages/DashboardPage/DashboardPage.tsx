import PageHeader from '../../components/PageHeader/PageHeader'
import { useFactory } from '../../context/useFactory'

export default function DashboardPage() {
  const { factory } = useFactory()

  return (
    <>
      <PageHeader eyebrow={`${factory.name} · Sample data`} title="Factory dashboard" />
      <p>
        This paragraph shows the body font. Headings above use Fraunces; this
        text uses Atkinson Hyperlegible on the cream background.
      </p>
    </>
  )
}
