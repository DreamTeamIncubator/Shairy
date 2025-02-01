import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import s from "./RadixSelect.module.scss";
import * as Select from "@radix-ui/react-select";

type Props = {
  children: React.ReactNode;
  value: string;
} & ComponentPropsWithoutRef<typeof Select.Item>;

export const SelectItem = ({ children, className, ...rest }: Props) => {
  return (
    <Select.Item
      className={clsx(s.item, className)} 
      {...rest}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
