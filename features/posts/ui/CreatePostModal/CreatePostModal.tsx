'use client';

import * as Dialog from '@radix-ui/react-dialog';
import {Button} from '@/shared/ui/Button/Button';
import CrossIcon from '@/public/icons/Vector.svg';
import s from './CreatePostModal.module.scss';
import Image from 'next/image';
import {useCreatePostLogic} from '@/features/posts/hooks/useCreatePostLogic';
import {CreatePost} from '@/features/posts/ui/CreatePost/CreatePost';
import ArrowLeftIcon from '@/shared/ui/Icons/ArrowLeftIcon';


type CreatePostModalProps = {
    isOpen: boolean,
    onClose: ()=> void,
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
    const {
        currentStep,
        steps,
        images,
        activeIndex,
        description,
        croppedImages,
        filteredImages,
        isConfirmationOpen,
        setImages,
        setActiveIndex,
        setDescription,
        setCroppedImages,
        setFilteredImages,
        onPublish,
        nextStep,
        prevStep,
        resetState,
        setIsConfirmationOpen,
    } = useCreatePostLogic();

    const handlePublish = async () => {
        const result = await onPublish();
        if (result.success) {
            onClose(); // Закрываем модалку только при успехе
        } else {
            alert(`Ошибка: ${result.error?.toString() || 'Неизвестная ошибка'}`);
        }
    };

    const handleRequestClose = () => {
        if (images.length || description) {
            setIsConfirmationOpen(true);
        } else {
            onClose();
        }
    };

    const handleConfirmClose = () => {
        resetState();
        setIsConfirmationOpen(false);
        onClose();
    };

    const handleCancelClose = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <>
            {/* Основная модалка */}
            <Dialog.Root
                open={isOpen}
                onOpenChange={(open) => open || handleRequestClose()}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className={s.overlay}/>
                    <Dialog.Content
                        className={s.content}
                        onInteractOutside={(e) => {
                            e.preventDefault();
                            handleRequestClose();
                        }}
                    >
                        <div className={s.header}>
                            <Dialog.Title className={s.title}>{steps[currentStep - 1]}</Dialog.Title>
                            <hr className={s.divider}/>
                            <div className={s.actions}>
                                {currentStep === 1 && (
                                    <Button className={s.closeButton} onClick={handleRequestClose} variant={'textButton'}>
                                        <Image src={CrossIcon} alt="Close"/>
                                    </Button>
                                )}

                                <div className={s.navigationButtons}>
                                    {currentStep > 1 && (
                                        <Button
                                            onClick={prevStep}
                                            className={s.prevButton}
                                            variant={'textButton'}
                                        >
                                            <ArrowLeftIcon/>
                                        </Button>
                                    )}
                                    {currentStep < 4 && currentStep > 1 && (
                                        <Button
                                            onClick={nextStep}
                                            className={s.nextButton}
                                            variant={'textButton'}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>

                                {currentStep === 4 && (
                                    <Button
                                        className={s.publishButton}
                                        onClick={handlePublish}
                                        disabled={!filteredImages.length || !description.trim()}
                                        variant={'textButton'}
                                    >
                                        Publish
                                    </Button>
                                )}

                            </div>
                        </div>

                        <CreatePost
                            steps={steps}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            currentStep={currentStep}
                            images={images}
                            setImages={setImages}
                            croppedImages={croppedImages}
                            setCroppedImages={setCroppedImages}
                            filteredImages={filteredImages}
                            setFilteredImages={setFilteredImages}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            description={description}
                            setDescription={setDescription}
                            onPublish={onPublish}
                            resetState={resetState}
                            isConfirmationOpen={isConfirmationOpen}
                            setIsConfirmationOpen={setIsConfirmationOpen}
                        />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Подтверждение закрытия */}
            <Dialog.Root open={isConfirmationOpen} onOpenChange={(open) => open || handleCancelClose()}>
                <Dialog.Portal>
                    <Dialog.Overlay className={s.confirmOverlay}/>
                    <Dialog.Content className={s.confirmContent}>
                        <div className={s.confirmHeader}>
                            <Dialog.Title className={s.confirmTitle}>Close</Dialog.Title>
                            <Dialog.Close asChild>
                                <button
                                    className={s.confirmCloseButton}
                                    aria-label="Close"
                                    onClick={handleCancelClose}
                                >
                                    <Image src={CrossIcon} alt="Close icon"/>
                                </button>
                            </Dialog.Close>
                        </div>

                        <hr className={s.divider}/>
                        <Dialog.Description className={s.confirmDescription}>
                            Do you really want to close the creation of a publication? If you close, everything will be
                            deleted.
                        </Dialog.Description>
                        <div className={s.confirmButtons}>
                            <Button
                                className={s.confirmButton}
                                variant={'outlined'}
                                onClick={handleConfirmClose}
                            >
                                Discard
                            </Button>
                            <Button
                                className={s.confirmButton}
                                variant={'primary'}
                                onClick={handleCancelClose}
                            >
                                Save draft
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};
