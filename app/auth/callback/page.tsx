'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGoogleLoginMutation, useGetMeQuery } from '@/features/auth/api/auth'

const AuthCallback = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const [token, setToken] = useState<string | null>(null)

  const { data: user, isSuccess } = useGetMeQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      googleLogin({ code, redirectUrl: `${window.location.origin}/auth/callback` })
        .unwrap()
        .then((response) => {
          localStorage.setItem('access-token', response.accessToken)
          setToken(response.accessToken)
        })
        .catch((error) => {
          console.error('Ошибка аутентификации (Google)', error)
          router.push('/auth/login')
        })
    }
  }, [searchParams, router])

  useEffect(() => {
    if (isSuccess && user) {
      console.log('User data:', user)
      router.push('/home')
    }
  }, [isSuccess, user, router])

  return <div>Авторизация через Google...</div>
}

export default AuthCallback
