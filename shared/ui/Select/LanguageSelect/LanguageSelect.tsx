'use client'

import s from './LanguageSelect.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { RadixSelect, Option as SelectOption } from '../RadixSelect'
import { useRouter, usePathname, useParams } from 'next/navigation'

const options: SelectOption[] = [
  { value: 'ru', label: 'Русский', icon: '/languages/flagRussian.svg' },
  { value: 'en', label: 'English', icon: '/languages/flagUK.svg' },
]

export const LanguageSelect = () => {
  const { lang } = useParams<{ lang: string }>()
  const router = useRouter()
  const path = usePathname()
  const [selectedLanguage, setSelectedLanguage] = useState(lang)

  const handleValueChange = (locale: string) => {
    setSelectedLanguage(locale)
    const newPath = path.replace(/^\/(en|ru)/, locale)

    // A cookie is recorded if the user has manually selected the language via select.
    // It has the highest priority for automatic redirects if there is no locale segment in the request URL
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${365 * 24 * 60 * 60}`
    router.replace(newPath)
  }

  return (
    <div className={s.selectedContainer}>
      <RadixSelect
        options={options}
        onValueChange={handleValueChange}
        className={s.languageSelect}
        value={selectedLanguage}
        renderValue={(option) => (
          <div className={s.selectedValue}>
            {option.icon && (
              <Image
                src={option.icon}
                alt={`${option.label} flag`}
                width={24}
                height={24}
                className={s.FlagIcon}
              />
            )}
            <span>{option.label}</span>
          </div>
        )}
        renderItem={(option) => (
          <div className={s.itemContent}>
            {option.icon && (
              <Image
                src={option.icon}
                alt={`${option.label} flag`}
                width={24}
                height={24}
                className={s.FlagIcon}
              />
            )}
            <span>{option.label}</span>
          </div>
        )}
      />
    </div>
  )
}
