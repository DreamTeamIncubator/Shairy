"use client";

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGoogleLoginMutation, useGitHubLoginMutation } from "@/store/services/auth/auth"

const AuthCallback = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const [gitHubLogin] = useGitHubLoginMutation()

  useEffect(() => {
    const code = searchParams.get("code")
    const provider = searchParams.get("provider")
    const redirectUrl = `${window.location.origin}/auth/callback?provider=${provider}`

    if (provider === "google" && code) {
      googleLogin({ code, redirectUrl })
        .unwrap()
        .then((response) => {
          sessionStorage.setItem("accessToken", response.accessToken)
          router.push("/home")
        })
        .catch((error) => {
          console.error("Ошибка аутентификации (Google)", error)
          router.push("/login")
        })

    } else if (provider === "github") {
      gitHubLogin({ redirect_url: redirectUrl })
        .unwrap()
        .then((response) => {
          sessionStorage.setItem("accessToken", response.accessToken)
          router.push("/home")
        })
        .catch((error) => {
          console.error("Ошибка аутентификации (GitHub)", error)
          router.push("/login")
        })
    } 
  }, [searchParams])

  return <p>Авторизация...</p>
}

export default AuthCallback
