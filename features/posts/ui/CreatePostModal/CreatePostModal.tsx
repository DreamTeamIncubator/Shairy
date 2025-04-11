'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import s from './CreatePostModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import CrossIcon from '../../../../public/icons/Vector.svg';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';

type CreatePostModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    hideCloseButton?: boolean;
    onNext?: () => void;
    onPrev?: () => void;
    currentStep: number;
    children: React.ReactNode;
};

export const CreatePostModal = ({
                                    open,
                                    onClose,
                                    title,
                                    hideCloseButton = false,
                                    onNext,
                                    onPrev,
                                    currentStep,
                                    children,
                                }: CreatePostModalProps) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Обработчик открытия модалки с подтверждением
    const handleCloseConfirmationOpen = () => {
        setIsConfirmationOpen(true);
    };

    // Обработчик подтверждения закрытия
    const handleConfirmClose = () => {
        onClose(); // Закрываем основное модальное окно
        setIsConfirmationOpen(false); // Закрываем модальное окно с подтверждением
    };

    // Обработчик отмены закрытия
    const handleCancelClose = () => {
        setIsConfirmationOpen(false); // Закрываем модальное окно с подтверждением
    };

    // Обработчик клика за пределами основной модалки
    const onClickOutsideHandler = (event: Event) => {
        event.preventDefault(); // Отменяем стандартное поведение
        handleCloseConfirmationOpen(); // Открываем модальное окно с подтверждением
    };

    return (
        <>
            {/* Основное модальное окно */}
            <Dialog.Root open={open} onOpenChange={onClose}>
                <Dialog.Portal>
                    <Dialog.Overlay className={s.overlay} />
                    <Dialog.Content
                        className={s.content}
                        onInteractOutside={onClickOutsideHandler} // Обработчик клика за пределами
                    >
                        <Dialog.Title asChild>
                            <VisuallyHidden>{title || 'Create Post Modal'}</VisuallyHidden>
                        </Dialog.Title>

                        {/* Шапка модалки */}
                        <div className={s.header}>
                            {title && <h2 className={s.title}>{title}</h2>}
                            {!hideCloseButton && (
                                <Dialog.Close asChild>
                                    <button className={s.closeButton} aria-label="Close">
                                        <Image src={CrossIcon} alt="Close icon" />
                                    </button>
                                </Dialog.Close>
                            )}
                            {/* Кнопки навигации */}
                            <div className={s.navigationButtons}>
                                {currentStep > 1 && (
                                    <Button variant={'textButton'} className={s.prevButton} onClick={onPrev}>
                                        <Image src={arrow} alt="Previous" />
                                    </Button>
                                )}
                                {currentStep >= 2 && currentStep < 4 && (
                                    <Button variant={'textButton'} className={s.nextButton} onClick={onNext}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>

                        <hr className={s.divider} />

                        {/* Основной контент */}
                        <div className={s.children}>{children}</div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Модальное окно с подтверждением */}
            <Dialog.Root open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className={s.confirmOverlay} />
                    <Dialog.Content className={s.confirmContent}>
                        <div className={s.confirmHeader}>
                            <Dialog.Title className={s.confirmTitle}>Close</Dialog.Title>
                            <Dialog.Close asChild>
                                <button className={s.confirmCloseButton} aria-label="Close">
                                    <Image src={CrossIcon} alt="Close icon"/>
                                </button>
                            </Dialog.Close>
                        </div>

                        <hr className={s.divider}/>
                        <Dialog.Description className={s.confirmDescription}>
                            Do you really want to close the creation of a publication?
                            If you close, everything will be deleted.
                        </Dialog.Description>
                        <div className={s.confirmButtons}>
                            <Button className={s.confirmButton} variant={'outlined'} onClick={handleCancelClose}>
                                Discard
                            </Button>
                            <Button className={s.confirmButton} variant={'primary'} onClick={handleConfirmClose}>
                                Save draft
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};