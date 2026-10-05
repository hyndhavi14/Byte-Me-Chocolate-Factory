import PageHeader from '../../components/PageHeader/PageHeader'
import { useFactory } from '../../context/useFactory'

export default function ProcessesPage() {
  const { factory } = useFactory()

  return <PageHeader eyebrow={`${factory.name} · Sample data`} title="Processes & Machines" />
}
