'use client';

import s from './LanguageSelect.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { RadixSelect } from '../RadixSelect';

const options = [
  { value: 'Russian', label: 'Russian', icon: '/languages/flagRussian.svg' },
  { value: 'English', label: 'English', icon: '/languages/flagUK.svg' },
];

export const LanguageSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(options[1]); 
  
  const handleValueChange = (value: string) => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSelectedLanguage(selectedOption);
      setOpen(false);
    }
  };

  return (
    <div className={s.SelectedContainer}>
      <RadixSelect 
        options={options}
        onValueChange={handleValueChange}
        className={s.LanguageSelect}
        value={selectedLanguage.value} 
        renderValue={(option) => ( 
          <div className={s.SelectedValue}>
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
          <div className={s.ItemContent}>
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
  );
};
