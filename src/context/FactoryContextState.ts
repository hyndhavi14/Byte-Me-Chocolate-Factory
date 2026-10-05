import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Factory } from '../data/types'

export interface FactoryContextValue {
  factory: Factory
  factories: Factory[]
  setFactoryId: Dispatch<SetStateAction<string>>
}

export const FactoryContext = createContext<FactoryContextValue | null>(null)
