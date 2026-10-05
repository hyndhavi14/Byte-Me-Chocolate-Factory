import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import factories from '../data/factories'
import type { Factory } from '../data/types'
import { FactoryContext } from './FactoryContextState'

export function FactoryProvider({ children }: { children: ReactNode }) {
  const [factoryId, setFactoryId] = useState('choc')
  const [customFactories, setCustomFactories] = useState<Factory[]>([])
  const allFactories = useMemo(
    () => [...factories, ...customFactories],
    [customFactories],
  )
  const factory = allFactories.find((item) => item.id === factoryId)

  if (!factory) {
    throw new Error(`Unknown factory id: ${factoryId}`)
  }

  const addFactory = useCallback((newFactory: Factory) => {
    setCustomFactories((existing) => [...existing, newFactory])
    setFactoryId(newFactory.id)
  }, [])

  const value = useMemo(
    () => ({
      factory,
      factories: allFactories,
      setFactoryId,
      addFactory,
    }),
    [factory, allFactories, addFactory],
  )

  return (
    <FactoryContext.Provider value={value}>
      {children}
    </FactoryContext.Provider>
  )
}
