import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import factories from '../data/factories'
import { FactoryContext } from './FactoryContextState'

export function FactoryProvider({ children }: { children: ReactNode }) {
  const [factoryId, setFactoryId] = useState('choc')
  const factory = factories.find((item) => item.id === factoryId)

  if (!factory) {
    throw new Error(`Unknown factory id: ${factoryId}`)
  }

  const value = useMemo(
    () => ({ factory, factories, setFactoryId }),
    [factory],
  )

  return (
    <FactoryContext.Provider value={value}>
      {children}
    </FactoryContext.Provider>
  )
}
