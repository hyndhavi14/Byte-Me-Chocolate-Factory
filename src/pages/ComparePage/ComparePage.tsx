import PageHeader from '../../components/PageHeader/PageHeader'
import { useFactory } from '../../context/useFactory'

export default function ComparePage() {
  const { factory } = useFactory()

  return <PageHeader eyebrow={`${factory.name} · Sample data`} title="Baseline vs Optimized" />
}
