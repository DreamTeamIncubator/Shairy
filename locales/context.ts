import { createContext } from 'react'
import { Dictionary } from './dictionaries/en'

export const TranslationContext = createContext<Dictionary | null>(null)
