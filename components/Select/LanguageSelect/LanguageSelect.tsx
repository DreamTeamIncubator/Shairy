'use client';

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Image from 'next/image';
import s from "./LanguageSelect.module.scss";
import { useState } from "react";
import { SelectItem } from "./../SelectItem";

const options = [
  { value: 'Russian', label: 'Russian', icon: '/languages/flagRussian.svg' },
  { value: 'English', label: 'English', icon: '/languages/flagUK.svg' },
];

export const LanguageSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(options[0]);

  const handleValueChange = (value: string) => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSelectedLanguage(selectedOption);
      setOpen(false);
    }
  };

  return (
    <div className={s.SelectContainer}>
      <Select.Root
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={setOpen}
      >
        <Select.Trigger className={`${s.Trigger} ${open ? s.Open : ''}`} aria-label="Language">
          <div className={s.SelectedValue}>
            <Image 
              src={selectedLanguage.icon}
              alt={`${selectedLanguage.label} flag`}
              width={24} 
              height={24} 
              className={s.FlagIcon} 
            />
            <span className={s.LanguageLabel}>{selectedLanguage.label}</span>
          </div>
          <Select.Icon className={s.Icon}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={s.Content} position="popper">
            <Select.ScrollUpButton className={s.ScrollButton}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className={s.Viewport}>
              <Select.Group>
                {options
                  .filter(option => option.value !== selectedLanguage.value)
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className={s.ItemContent}>
                        <Image 
                          src={option.icon}
                          alt={`${option.label} flag`}
                          width={24} 
                          height={24} 
                          className={s.FlagIcon} 
                        />
                        <span className={s.LanguageLabel}>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className={s.ScrollButton}>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
