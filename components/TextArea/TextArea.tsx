'use client'

import React, { useState } from 'react';
import s from './TextArea.module.scss'; 
import clsx from 'clsx';

type Props = {
  label: string
  width: string
  placeholder?: string
  showError?: boolean
  error?: string
  disabled?: boolean
  showCharacterCount?: boolean
}

export const TextArea = ({showError, label, placeholder, error, disabled, width, showCharacterCount}: Props) => {
  const [characterCount, setCharacterCount] = useState(0)

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.currentTarget.value.length)
  }

  return (
    <div className = {s.textAreaContainer}  style={{ width }}>
      <label className = {s.label}>{label}</label>
        <textarea className={clsx(s.textArea, { [s.error]: showError })} placeholder={placeholder} 
        disabled={disabled} onChange={handleChange}  style={{ width }}/>
        {showCharacterCount && (<div className={s.character}>
          {characterCount}/500
        </div>
)}
        {showError && <span className={s.error}>{error}</span>}
    </div>
  );
};




