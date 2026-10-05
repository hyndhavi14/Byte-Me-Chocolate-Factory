import PageHeader from '../../components/PageHeader/PageHeader'
import { useFactory } from '../../context/useFactory'

export default function EnergyPage() {
  const { factory } = useFactory()

  return <PageHeader eyebrow={`${factory.name} · Sample data`} title="Energy Analysis" />
}
