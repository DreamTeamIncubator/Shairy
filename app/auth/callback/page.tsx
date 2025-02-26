"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleLoginMutation } from "@/store/services/auth/auth";

  const AuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [googleLogin] = useGoogleLoginMutation();

  useEffect(() => {

    const provider = searchParams.get("provider") || 
      (window.location.href.includes("github") ? "github" : "google");

    const code = searchParams.get("code");
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      console.log("AccessToken найден:", accessToken);
      sessionStorage.setItem("accessToken", accessToken);
      router.push("/home");
      return;
    }

    if (provider === "google" && code) {
      googleLogin({ code, redirectUrl: `${window.location.origin}/auth/callback` })
        .unwrap()
        .then((response) => {
          sessionStorage.setItem("accessToken", response.accessToken);
          router.push("/home");
        })
        .catch((error) => {
          console.error("Ошибка аутентификации (Google)", error);
          router.push("/login");
        });
    }
  }, [searchParams, googleLogin, router]);

};

export default AuthCallback;
