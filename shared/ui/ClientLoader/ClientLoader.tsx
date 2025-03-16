'use client'

import { ReactNode } from 'react'
import { useGetMeQuery } from '../../../features/auth/api/auth'
import { Loader } from './Loader'

export function ClientLoader({ children }: { children: ReactNode }) {
  const { isLoading } = useGetMeQuery()

  if (isLoading) {
    return <Loader />
  }

  return <>{children}</>
}
