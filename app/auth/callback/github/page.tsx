"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGitHubLoginMutation } from "@/app/store/auth/auth"

const GitHubAuthCallback = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [gitHubLogin] = useGitHubLoginMutation()

  useEffect(() => {
    const code = searchParams.get("code")
    const accessToken = searchParams.get("accessToken")

    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken)
      router.push("/home")
      return
    }

    if (code) {
      gitHubLogin({ redirect_url: `${window.location.origin}/auth/callback/github` })
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
  }, [searchParams, gitHubLogin, router])

}

export default GitHubAuthCallback
