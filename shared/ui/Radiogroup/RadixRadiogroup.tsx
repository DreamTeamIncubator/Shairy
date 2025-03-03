import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from 'clsx';
import s from "./RadixRadiogroup.module.scss";
import { ComponentPropsWithoutRef } from "react";

type Props = {
    textLabel?: string;
    disabled?: boolean;
}& ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const RadixRadioGroup = ({ textLabel, disabled, ...rest }: Props) => (
    <form>
        <RadioGroup.Root
            className={s.root}
            defaultValue=""
            aria-label="View density"
            disabled={disabled}
            {...rest}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <RadioGroup.Item className={clsx(s.item)} value="options1" id="r1">
                    <RadioGroup.Indicator className={s.indicator} />
                </RadioGroup.Item>
                <label className={s.label} htmlFor="r1">
                    {textLabel}
                </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <RadioGroup.Item className={clsx(s.item)} value="options2" id="r1">
                    <RadioGroup.Indicator className={s.indicator}/>
                </RadioGroup.Item>
                <label className={s.label} htmlFor="r1">
                    {textLabel}
                </label>
            </div>
        </RadioGroup.Root>
    </form>
);
