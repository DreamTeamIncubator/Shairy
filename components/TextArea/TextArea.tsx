import React from 'react';
import s from './TextArea.module.scss'


type Props = {
  label: string
  placeholder: string
  showError?: boolean
  error?: string
  disabled?: boolean
}

export const TextArea = ({showError, label, placeholder, error, disabled}: Props) => {
  return (
    <div className = {s.textAreaContainer}>
      <label className = {s.label}>{label}</label>
        <textarea className={`${s.textArea} ${showError ? s.error: ''}`} placeholder={placeholder} disabled={disabled}/>
        {showError && <span className={s.error}>{error}</span>}
    </div>
  );
};




