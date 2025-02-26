"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGoogleLoginMutation } from "@/store/services/auth/auth"

const AuthCallback = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const code = searchParams.get("code")
  
    if (code) {
      googleLogin({ code, redirectUrl: `${window.location.origin}/auth/callback` })
        .unwrap()
        .then((response) => {
          sessionStorage.setItem("accessToken", response.accessToken)
          router.push("/home")
        })
        .catch((error) => {
          console.error("Ошибка аутентификации (Google)", error)
          router.push("/login")
        })
    }
  }, [searchParams, googleLogin, router])

}

export default AuthCallback

