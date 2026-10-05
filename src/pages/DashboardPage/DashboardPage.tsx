import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import KpiCard from '../../components/KpiCard/KpiCard'
import Legend from '../../components/Legend/Legend'
import PageHeader from '../../components/PageHeader/PageHeader'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import StatusChip from '../../components/StatusChip/StatusChip'
import { useFactory } from '../../context/useFactory'
import type {
  CompareMetric,
  HourEnergy,
  Machine,
  ScheduleBlock,
} from '../../data/types'
import { Link } from 'react-router-dom'
import styles from './DashboardPage.module.css'

const PLAY_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 5.14v13.72L19 12 8 5.14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CUBE_ICON = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="m20 4 14 8v16l-14 8-14-8V12l14-8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="m6 12 14 8 14-8M20 20v16M13 8l14 8" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const BLOCK_CLASSES: Record<ScheduleBlock['colorKey'], string> = {
  roast: styles.roast,
  grind: styles.grind,
  conche: styles.conche,
  temper: styles.temper,
  mould: styles.mould,
  pack: styles.pack,
}

function EnergyChart({
  energyByHour,
}: { energyByHour: HourEnergy[] }) {
  return (
    <div className={styles.energyChart}>
      <div className={styles.chartScroller} role="img" aria-label="Hourly solar and grid energy use">
        <div className={styles.chartInner}>
          <div className={styles.chartBars}>
            {energyByHour.map((hour) => (
              <div
                className={styles.chartColumn}
                key={hour.hour}
                title={`${String(hour.hour).padStart(2, '0')}:00 — solar ${hour.solarKwh} kWh, grid ${hour.gridKwh} kWh`}
                aria-hidden="true"
              >
                <div
                  className={styles.solarBar}
                  style={{ height: `${hour.solarKwh * 3}px` }}
                />
                <div
                  className={`${styles.gridBar}${hour.solarKwh === 0 ? ` ${styles.gridBarTop}` : ''}`}
                  style={{ height: `${hour.gridKwh * 3}px` }}
                />
              </div>
            ))}
          </div>
          <div className={styles.tariffStrip} aria-hidden="true">
            {energyByHour.map((hour) => (
              <div
                className={`${styles.tariffBar} ${styles[`tariff-${hour.tariff}`]}`}
                key={hour.hour}
                title={`${String(hour.hour).padStart(2, '0')}:00 · ${hour.tariff} tariff`}
              />
            ))}
          </div>
          <div className={styles.hourLabels} aria-hidden="true">
            {energyByHour.map((hour) => (
              <span key={hour.hour}>
                {hour.hour % 3 === 0 ? String(hour.hour).padStart(2, '0') : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.chartNote}>
        Heavy processes were moved into the 10:00–15:00 solar window and out of the
        18:00–22:00 peak price band.
      </p>
    </div>
  )
}

function CompareCard({
  compare,
}: { compare: CompareMetric[] }) {
  return (
    <Card title="Baseline vs optimized">
      <Legend
        items={[
          { label: 'Baseline', color: 'var(--tan)', shape: 'square' },
          { label: 'Optimized', color: 'var(--teal)', shape: 'square' },
        ]}
      />
      <div className={styles.compareList}>
        {compare.map((metric) => (
          <div className={styles.compareMetric} key={metric.label}>
            <div className={styles.compareHeading}>
              <strong>{metric.label}</strong>
              <span>{metric.change}</span>
            </div>
            <div className={styles.compareBarRow}>
              <ProgressBar
                value={metric.baselinePct}
                color="var(--tan)"
                height={12}
                ariaLabel={`${metric.label} baseline`}
              />
              <span className={styles.compareValue}>{metric.baseline}</span>
            </div>
            <div className={styles.compareBarRow}>
              <ProgressBar
                value={metric.optimizedPct}
                color="var(--teal)"
                height={12}
                ariaLabel={`${metric.label} optimized`}
              />
              <strong className={styles.compareValue}>{metric.optimized}</strong>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SchedulePreview({
  schedule,
  machines,
}: {
  schedule: ScheduleBlock[]
  machines: Machine[]
}) {
  const machineById = new Map(machines.map((machine) => [machine.id, machine]))

  return (
    <div className={styles.ganttScroller}>
      <div className={styles.ganttInner}>
        {schedule.map((block) => {
          const machine = machineById.get(block.machineId)
          const left = (block.start / 24) * 100
          const width = ((block.end - block.start) / 24) * 100

          return (
            <div className={styles.ganttRow} key={block.id}>
              <span className={styles.ganttMachine}>
                {machine?.name ?? block.processName}
              </span>
              <div className={styles.ganttTrack}>
                <span
                  className={`${styles.ganttBlock} ${BLOCK_CLASSES[block.colorKey]}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${block.processName} · ${block.start}:00–${block.end}:00`}
                >
                  {block.processName}
                </span>
              </div>
            </div>
          )
        })}
        <div className={styles.timeAxis} aria-hidden="true">
          {['00:00', '06:00', '12:00', '18:00', '24:00'].map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MachineList({ machines }: { machines: Machine[] }) {
  return (
    <div className={styles.machineList}>
      {machines.map((machine) => (
        <div className={styles.machineRow} key={machine.id}>
          <div className={styles.machineDetails}>
            <strong>{machine.name}</strong>
            <span>{machine.ratedKw} kW rated</span>
          </div>
          <StatusChip status={machine.status} />
          <div className={styles.utilization}>
            <ProgressBar
              value={machine.utilization}
              color={machine.utilization > 80 ? 'var(--caramel)' : 'var(--toffee)'}
              height={10}
              ariaLabel={`${machine.name} utilization`}
            />
            <strong>{machine.utilization}%</strong>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const { factory } = useFactory()
  const machines = factory.stages.flatMap((stage) => stage.machines)

  return (
    <>
      <PageHeader
        eyebrow={`${factory.name} · Sample data`}
        title="Factory dashboard"
        actions={[
          <Button key="export" variant="secondary">Export report</Button>,
          <Button key="optimize" variant="primary" icon={PLAY_ICON}>
            Run optimization
          </Button>,
        ]}
      />

      <section className={styles.kpiGrid} aria-label="Factory key performance indicators">
        {factory.kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            note={kpi.note}
            dotColor={kpi.dotColor}
          />
        ))}
      </section>

      <section className={styles.twoColumnGrid} aria-label="Energy and comparison">
        <Card title="Energy use today">
          <Legend
            items={[
              { label: 'Solar', color: 'var(--sun)', shape: 'dot' },
              { label: 'Grid', color: 'var(--grid-brown)', shape: 'dot' },
              { label: 'Peak price', color: 'var(--terracotta)', shape: 'dashed' },
            ]}
          />
          <EnergyChart energyByHour={factory.energyByHour} />
        </Card>
        <CompareCard compare={factory.compare} />
      </section>

      <section className={styles.twoColumnGrid} aria-label="Schedule and machines">
        <Card
          title="Optimized schedule"
          action={
            <Link className={styles.timelineLink} to="/schedule">
              Open full timeline →
            </Link>
          }
        >
          <SchedulePreview
            schedule={factory.optimizedSchedule}
            machines={machines}
          />
        </Card>
        <Card title="Machines">
          <MachineList machines={machines} />
        </Card>
      </section>

      <section className={styles.modelSlot} aria-label="Factory floor view">
        <div className={styles.modelIcon}>{CUBE_ICON}</div>
        <div className={styles.modelCopy}>
          <h2>
            {factory.has3dModel
              ? `${factory.name} · 3D view`
              : `${factory.name} · 2D floor plan`}
          </h2>
          <p>
            {factory.has3dModel
              ? 'Interactive 3D model of the production floor. Machines light up as they run on the optimized schedule.'
              : 'See this factory as a 2D floor plan.'}
          </p>
        </div>
        <Link className={styles.modelLink} to="/factory-view">
          <span className={styles.modelLinkButton}>
            {factory.has3dModel ? 'Open 3D view' : 'Open factory view'}
          </span>
        </Link>
      </section>
    </>
  )
}
