import { getDictionary } from '@/locales/dictionaries/dictionaries'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useTranslationData = () => {
  const path = usePathname()
  const [localeData, setLocaleData] = useState<any>(null)
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await getDictionary(path.split('/')[1] as 'en' | 'ru')
        setLocaleData(dictionary)
      } finally {
      }
    }

    loadDictionary()
  }, [path])
  return localeData
}
