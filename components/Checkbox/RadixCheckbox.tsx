import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import s from "./RadixCheckbox.module.scss";
import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react";

type Props = {
  disabled?: boolean
  showLabel?: boolean
  textLabel?: string
} & ComponentPropsWithoutRef<typeof Checkbox.Root>;

export const RadixCheckbox = ({ disabled, showLabel, textLabel, ...rest }: Props) => (
  <form>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox.Root className={s.root} disabled={disabled} {...rest}>
        <Checkbox.Indicator className={clsx(s.indicator, {[s.disabledIndicator]: disabled })}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {showLabel && (
        <label className={clsx(s.label, {[s.disabledLabel]: disabled })} htmlFor="c1">
          {textLabel}
        </label>
      )}
    </div>
  </form>
);
