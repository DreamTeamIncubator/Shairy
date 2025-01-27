'use client'

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import s from "./RadixSelect.module.scss";
import { ComponentPropsWithoutRef, useState } from "react";
import { SelectItem } from "./RadixSelectItem";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[]
  onValueChange: (value: string) => void
  placeholder: string
  value?: string
  label?: string
  disabled?: boolean
  showPlaceholderLabel?: boolean
  placeholderLabel?: string
} & ComponentPropsWithoutRef<typeof Select.Root>;

export const RadixSelect = ({
  placeholder,
  value,
  label,
  options,
  disabled,
  placeholderLabel,
  showPlaceholderLabel,
  onValueChange,
  ...rest
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.SelectContainer}>
    {showPlaceholderLabel && (
        <label className={s.PlaceholderLabel}>{placeholderLabel}</label>
    )}

    <Select.Root
      onValueChange={onValueChange}
      disabled={disabled}
      open={open}
      onOpenChange={setOpen}
      {...rest}
    >
      <Select.Trigger className={`${s.Trigger} ${open ? s.Open : ''}`} aria-label="Food">
        <Select.Value placeholder={placeholder} />
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
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
