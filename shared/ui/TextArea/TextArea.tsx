'use client'

import React, { ComponentPropsWithoutRef, useState } from 'react';
import s from './TextArea.module.scss'; 
import clsx from 'clsx';

type Props = {
  label?: string
  placeholder?: string
  showError?: boolean
  error?: string
  disabled?: boolean
  showCharacterCount?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextArea = ({showError, label, placeholder, error, disabled, className, showCharacterCount}: Props) => {
  const [characterCount, setCharacterCount] = useState(0)

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.currentTarget.value.length)
  }

  return (
    <div className = {s.textAreaContainer}  >
      <label className = {s.label}>{label}</label>
        <textarea className={clsx(s.textArea, { [s.error]: showError }, className)} placeholder={placeholder} 
        disabled={disabled} onChange={handleChange}  />
        {showCharacterCount && (<div className={s.character}>
          {characterCount}/500
        </div>
)}
        {showError && <span className={s.error}>{error}</span>}
    </div>
  );
};




