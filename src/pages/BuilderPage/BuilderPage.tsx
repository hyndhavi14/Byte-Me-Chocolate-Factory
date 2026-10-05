import PageHeader from '../../components/PageHeader/PageHeader'
import { useFactory } from '../../context/useFactory'

export default function BuilderPage() {
  const { factory } = useFactory()

  return <PageHeader eyebrow={`${factory.name} · Sample data`} title="Factory Builder" />
}
