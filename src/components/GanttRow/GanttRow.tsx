import type { CSSProperties } from 'react'
import type { ScheduleBlock } from '../../data/types'
import styles from './GanttRow.module.css'

const BLOCK_CLASSES: Record<ScheduleBlock['colorKey'], string> = {
  roast: styles.roast,
  grind: styles.grind,
  conche: styles.conche,
  temper: styles.temper,
  mould: styles.mould,
  pack: styles.pack,
}

function formatTime(hour: number) {
  return `${Math.floor(hour)}:${hour % 1 === 0 ? '00' : '30'}`
}

interface GanttRowProps {
  label: string
  sublabel?: string
  blocks: ScheduleBlock[]
  height?: number
  trackStyle?: CSSProperties
  compact?: boolean
}

export default function GanttRow({
  label,
  sublabel,
  blocks,
  height = 44,
  trackStyle,
  compact = false,
}: GanttRowProps) {
  return (
    <div
      className={`${styles.row}${compact ? ` ${styles.compactRow}` : ''}`}
      role="group"
      aria-label={`${label} schedule`}
    >
      <div className={styles.label}>
        <strong>{label}</strong>
        {sublabel && <span>{sublabel}</span>}
      </div>
      <div className={styles.track} style={{ height, ...trackStyle }}>
        {blocks.map((block) => (
          <span
            className={`${styles.block} ${BLOCK_CLASSES[block.colorKey]}${compact ? ` ${styles.compact}` : ''}${block.shifted ? ` ${styles.shifted}` : ''}`}
            key={block.id}
            style={{
              left: `${(block.start / 24) * 100}%`,
              width: `${((block.end - block.start) / 24) * 100}%`,
            }}
            title={`${block.processName} · ${formatTime(block.start)}–${formatTime(block.end)}`}
          >
            {block.processName}
          </span>
        ))}
      </div>
    </div>
  )
}
