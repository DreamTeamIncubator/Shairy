'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import s from './RadixSelect.module.scss';
import { ComponentPropsWithoutRef, useState} from 'react';
import { SelectItem } from './SelectItem';
import clsx from 'clsx';

type Option = {
  value: string;
  label: string;
  icon?: string;
};

type Props = {
  className?: string;
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showPlaceholderLabel?: boolean;
  placeholderLabel?: string;
  renderItem?: (option: Option) => React.ReactNode;
  renderValue?: (option: Option) => React.ReactNode; 
} & ComponentPropsWithoutRef<typeof Select.Root>;

export const RadixSelect = ({
  className,
  placeholder,
  value,
  options,
  disabled,
  placeholderLabel,
  showPlaceholderLabel,
  onValueChange,
  renderItem,
  renderValue,
  ...rest
}: Props) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div>
      {showPlaceholderLabel && <label className={s.placeholderLabel}>{placeholderLabel}</label>}

      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
        {...rest}>
        <Select.Trigger className={clsx(s.selectTrigger, { [s.open]: open }, className)} aria-label="Select">
          {selectedOption ? (
            renderValue ? renderValue(selectedOption) : selectedOption.label
          ) : (
            <Select.Value placeholder={placeholder} />
          )}
          <Select.Icon className={clsx(s.icon, className)} >
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={clsx(s.selectContent, className)} position = "popper">
            <Select.Viewport className={clsx(s.viewport, className)}>
              <Select.Group>
                {options
                  .filter(option => option.value !== value) 
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {renderItem ? renderItem(option) : option.label}
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
