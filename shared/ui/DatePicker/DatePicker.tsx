'use client';

import { ComponentProps, FC, forwardRef, useCallback, memo } from 'react';
import ReactDatePicker, { registerLocale, DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';
import s from './DatePicker.module.scss';

registerLocale('ru', ru);

// Чистые пропсы нашего компонента (без конфликтов с DatePicker)
type CustomDatePickerProps = {
    errorMessage?: string
    label?: string
    placeholder?: string
    onChange: (date: Date | null) => void
    setEndDate?: (date: Date | null) => void
    setStartDate?: (date: Date | null) => void
    startDate?: Date | null
    endDate?: Date | null
    required?: boolean
    maxDate?: Date | null
};

// Исключаем конфликтующие пропсы и объединяем с нашими
type Props = CustomDatePickerProps &
    Omit<DatePickerProps,
        'onChange' |
        'selected' |
        'selectsRange' |
        'startDate' |
        'endDate' |
        'selectsStart' |
        'selectsEnd'
    >;

export const DatePicker: FC<Props> = memo(({
    className,
    disabled,
    endDate,
    errorMessage,
    label,
    placeholder,
    placeholderText,
    required,
    setEndDate,
    setStartDate,
    startDate,
    maxDate,
    onChange,
    ...rest
    }) => {
    const handleDateChange = useCallback<NonNullable<DatePickerProps['onChange']>>(
        (date: Date | [Date | null, Date | null] | null) => {
            if (Array.isArray(date)) {
                const [start, end] = date;
                setStartDate?.(start);
                setEndDate?.(end);
            } else {
                setStartDate?.(date);
            }
            onChange?.(Array.isArray(date) ? date[0] : date);
        },
        [setStartDate, setEndDate, onChange]
    );

    const divProps: ComponentProps<'div'> = {
        className: clsx(s.root, disabled && s.disabled, className),
    };

    if (disabled) {
        return (
            <div {...divProps}>
                <CustomInput disabled label={label} required={required} error={!!errorMessage} />
            </div>
        );
    }

    return (
        <>
            <ReactDatePicker
                selected={startDate}
                onChange={handleDateChange}
                selectsRange={!!setEndDate}
                startDate={startDate}
                endDate={endDate}
                disabled={disabled}
                placeholderText={placeholder}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                maxDate={maxDate}
                className={clsx(s.input, errorMessage && s.error, endDate && s.range)}
                customInput={
                    <CustomInput
                        label={label}
                        required={required}
                        error={!!errorMessage}
                    />
                }
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                }) => (
                    <div className={s.header}>
                        <div>{format(date, 'LLLL yyyy', { locale: ru })}</div>
                        <div className={s.buttonBox}>
                            <button
                                type="button"
                                aria-label="Предыдущий месяц"
                                onClick={decreaseMonth}
                                className={s.button}
                            >
                                назад
                            </button>
                            <button
                                type="button"
                                aria-label="Следующий месяц"
                                onClick={increaseMonth}
                                className={s.button}
                            >
                                вперед
                            </button>
                        </div>
                    </div>
                )}
                {...rest}
            />
            {errorMessage && <p className={s.errorText}>{errorMessage}</p>}
        </>
    );
});

type CustomInputProps = {
    disabled?: boolean;
    label?: string;
    required?: boolean;
    error?: boolean;
    value?: string;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = memo(forwardRef<HTMLInputElement, CustomInputProps>(
    ({ disabled, label, required, error, ...props }, ref) => (
        <div className={clsx(s.inputContainer, error && s.error)}>
            {label && (
                <label>
                    {label}
                    {required && <span className={s.required}>*</span>}
                </label>
            )}
            <input
                ref={ref}
                disabled={disabled}
                className={s.inputField}
                aria-invalid={error}
                {...props}
            />
        </div>
    )
));

DatePicker.displayName = 'DatePicker';
CustomInput.displayName = 'CustomInput';