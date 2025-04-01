'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import s from './DatePicker.module.scss';
import clsx from 'clsx';
import { formatDateToDDMMYYYY, parseDateString } from '@/utils/utils';

type Props = {
    value: string // Текущая дата в формате "DD.MM.YYYY"
    onChange: (date: string) => void
    error?: string
} & React.ComponentProps<'div'>;

export const DatePicker = ({ value, onChange, error, ...rest }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Обработка выбора даты из календаря
    const handleDaySelect = (date: Date | undefined) => {
        const formattedDate = date ? formatDateToDDMMYYYY(date) : '';
        onChange(formattedDate);
        setInputValue(formattedDate);
        setIsOpen(false);
    };

    // Обработка ручного ввода даты
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setInputValue(input);

        // Проверяем формат даты
        if (input.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            const parsedDate = parseDateString(input);
            if (parsedDate && !isNaN(parsedDate.getTime())) {
                onChange(formatDateToDDMMYYYY(parsedDate));
            }
        } else {
            onChange(''); // Если формат неверный, очищаем значение
        }
    };

    // Закрытие календаря при клике вне области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className={s.datePickerContainer} {...rest}>
            <input
                type="text"
                className={clsx(s.input, error && s.error)}
                value={inputValue}
                onChange={handleInputChange}
                onClick={() => setIsOpen(true)}
                placeholder="DD.MM.YYYY"
            />
            {isOpen && (
                <div className={s.calendarWrapper}>
                    <DayPicker
                        mode="single"
                        showOutsideDays
                        fixedWeeks
                        selected={value ? parseDateString(value) : undefined}
                        onSelect={handleDaySelect}
                        disabled={{ after: new Date() }}
                        classNames={{
                            root: s.rpdRoot,
                            caption: s.rpdCaption,
                            caption_label: s.rpdCaptionLabel,
                            month_caption: s.rpdMonth,
                            nav: s.rdpNav,
                            head: s.rpdHead,
                            row: s.rpdRow,
                            cell: s.rpdCell,
                            weekday: s.rpdWeekday,
                            day: s.rpdDay,
                            day_selected: s.rpdSelected,
                            day_outside: s.rpdOutside,
                            day_today: s.rpdToday,
                            day_disabled: s.rpdDisabled,
                        }}
                    />
                </div>
            )}
            {error && <p className={s.errorText}>{error}</p>}
        </div>
    );
};
