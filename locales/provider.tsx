'use client'

import { Context, FC, PropsWithChildren, useContext } from 'react'
import { Dictionary } from './dictionaries/en'
import { TranslationContext } from './context'

type Props = PropsWithChildren<{
  value: Dictionary
}>

export const TranslationProvider: FC<Props> = ({ value, children }) => (
  <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
)

export const useTranslation = () =>
  useContext<Dictionary>(TranslationContext as Context<Dictionary>)
