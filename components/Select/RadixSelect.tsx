'use client'

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import s from './RadixSelect.module.scss';
import { ComponentPropsWithoutRef, useState } from 'react';
import { SelectItem } from './SelectItem';
import clsx from 'clsx';

type Option = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  showPlaceholderLabel?: boolean;
  placeholderLabel?: string;
} & ComponentPropsWithoutRef<typeof Select.Root>;

export const RadixSelect = ({
  className,
  placeholder,
  options,
  disabled,
  placeholderLabel,
  showPlaceholderLabel,
  onValueChange,
  ...rest
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(s.SelectContainer, className)}>
      {showPlaceholderLabel && <label className={s.PlaceholderLabel}>{placeholderLabel}</label>}

      <Select.Root
        onValueChange={onValueChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
        {...rest}>
        <Select.Trigger className={clsx(s.Trigger, { [s.Open]: open }, className)} aria-label="Select">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={clsx(s.Icon, className)}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={clsx(s.Content, className)} position="popper">
            <Select.Viewport className={clsx(s.Viewport, className)}>
              <Select.Group>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
