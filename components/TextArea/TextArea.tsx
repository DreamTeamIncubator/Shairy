import React from 'react';
import s from './TextArea.module.scss'


type Props = {
  label: string
  placeholder: string
  showError: boolean
  error: string
  disabled?: boolean
}

export const TextArea = ({showError, label, placeholder, error, disabled}: Props) => {
  return (
    <div className = {s.TextAreaContainer}>
      <label className = {s.Label}>Text-area</label>
        <textarea className={`${s.TextArea} ${showError ? s.error: ''}`} placeholder={'text-area'} disabled={disabled}/>
        {showError && <span className={s.Error}>{'Error text'}</span>}
    </div>
  );
};




