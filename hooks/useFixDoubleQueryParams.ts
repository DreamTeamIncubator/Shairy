import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useFixDoubleQueryParams = () => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      if (url.split('?').length > 2) {
        const fixedUrl = url.replace(/\?(?=[^?]*$)/, '&')
        router.replace(fixedUrl, { scroll: false })
      }
    }
  }, [router])
}
