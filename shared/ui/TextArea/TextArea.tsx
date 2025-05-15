'use client'

import React, { ComponentPropsWithoutRef, useState } from 'react'
import s from './TextArea.module.scss'
import clsx from 'clsx'

type Props = {
  label?: string
  placeholder?: string
  showError?: boolean
  error?: string
  disabled?: boolean
  showCharacterCount?: boolean
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = ({
  showError,
  label,
  placeholder,
  error,
  disabled,
  className,
  showCharacterCount,
  value,
  onChange,
}: Props) => {
  const [characterCount, setCharacterCount] = useState(value?.length || 0)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.currentTarget.value.length)
    onChange(e)
  }

  return (
    <div className={s.textAreaContainer}>
      {label && <label className={s.label}>{label}</label>}
      <textarea
        className={clsx(s.textArea, { [s.error]: showError }, className)}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      {showCharacterCount && <div className={s.character}>{characterCount}/500</div>}
      {showError && <span className={s.error}>{error}</span>}
    </div>
  )
}
