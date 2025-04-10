'use client'

import s from './LanguageSelect.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { RadixSelect } from '../RadixSelect'
import { useRouter, usePathname } from 'next/navigation'
const options = [
  { value: 'ru', label: 'Русский', icon: '/languages/flagRussian.svg' },
  { value: 'en', label: 'English', icon: '/languages/flagUK.svg' },
]

export const LanguageSelect = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const path = usePathname()
  const [selectedLanguage, setSelectedLanguage] = useState(
    options.find((el) => el.value === path.split('/')[1])
  )

  const handleValueChange = () => {
    const selectedOption = options.find((option) => option.value === path.split('/')[1])

    if (selectedOption) {
      const newLang = path.split('/')[1] === 'en' ? 'ru' : 'en'

      const currentPath = window.location.pathname
      const pathWithoutLocale = currentPath.replace(/^\/(en|ru)/, '') || '/'
      const newUrl = `/${newLang}${pathWithoutLocale}`
      router.push(newUrl)
      setSelectedLanguage(selectedOption)
      setOpen(false)
    }
  }

  return (
    <div className={s.selectedContainer}>
      <RadixSelect
        options={options}
        onValueChange={handleValueChange}
        className={s.languageSelect}
        value={selectedLanguage && selectedLanguage.value}
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
