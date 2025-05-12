'use client'

import React, { useState, useCallback, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import s from './ImagesCropper.module.scss';
import arrow from '../../../../public/icons/arrow.svg';
import Image from 'next/image';
import Rectangle18x26Icon from '@/shared/ui/Icons/Rectangle18x26Icon';
import Rectangle18x18Icon from '@/shared/ui/Icons/Rectangle18x18Icon';
import Rectangle20x26Icon from '@/shared/ui/Icons/Rectangle20x26Icon';
import ImagePreviewIcon from '@/shared/ui/Icons/ImagePreviewIcon';
import ExpandIcon from '@/shared/ui/Icons/ExpandIcon';
import {Button} from '@radix-ui/themes';

type Props = {
    images: string[];
    onCropComplete: (croppedImage: string, index: number) => void;
};

type AspectType = 'original' | number;

const ImagesCropper = ({ images, onCropComplete }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedAspects, setSelectedAspects] = useState<Record<number, AspectType>>(
        () => images.reduce((acc, _, index) => ({ ...acc, [index]: 'original' }), {})
    );
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [showAspectOptions, setShowAspectOptions] = useState(false);
    const [lastProcessedAspect, setLastProcessedAspect] = useState<Record<number, AspectType>>({});

    // При изменении активного индекса сбрасываем состояние обработки
    useEffect(() => {
        setLastProcessedAspect(prev => ({ ...prev, [activeIndex]: selectedAspects[activeIndex] }));
    }, [activeIndex, selectedAspects]);

    const handleAspectChange = useCallback((aspect: AspectType) => {
        setSelectedAspects(prev => ({ ...prev, [activeIndex]: aspect }));
        setShowAspectOptions(false);

        // Если выбран "original", сразу передаем оригинальное изображение
        if (aspect === 'original') {
            onCropComplete(images[activeIndex], activeIndex);
            setLastProcessedAspect(prev => ({ ...prev, [activeIndex]: 'original' }));
        }
    }, [activeIndex, images, onCropComplete]);

    const handleCropComplete = useCallback((croppedImage: string) => {
        // Передаем результат только если аспект не 'original' И он изменился
        if (selectedAspects[activeIndex] !== 'original' &&
            lastProcessedAspect[activeIndex] !== selectedAspects[activeIndex]) {
            onCropComplete(croppedImage, activeIndex);
            setLastProcessedAspect(prev => ({ ...prev, [activeIndex]: selectedAspects[activeIndex] }));
        }
    }, [activeIndex, selectedAspects, lastProcessedAspect, onCropComplete]);

    const currentAspect = selectedAspects[activeIndex];
    const hasMultipleImages = images.length > 1;

    return (
        <div className={s.imagesCropper}>
            {/* кнопка отображения вариантов обрезки */}
            <button
                onClick={() => setShowAspectOptions(!showAspectOptions)}
                className={s.toggleAspectButton}
            >
                <ExpandIcon isActive={showAspectOptions} />
            </button>

            {/* варианты обрезки фоток */}
            {showAspectOptions && (
                <div className={s.aspectRatioBtns}>
                    <div
                        onClick={() => handleAspectChange('original')}
                        className={`${s.aspectRatioContainer} ${currentAspect === 'original' ? s.active : ''}`}
                    >
                        <span>Оригинал</span>
                        <ImagePreviewIcon />
                    </div>
                    <div
                        onClick={() => handleAspectChange(1)}
                        className={`${s.aspectRatioContainer} ${currentAspect === 1 ? s.active : ''}`}
                    >
                        <span>1:1</span>
                        <Rectangle18x18Icon isActive={currentAspect === 1} />
                    </div>
                    <div
                        onClick={() => handleAspectChange(4 / 5)}
                        className={`${s.aspectRatioContainer} ${currentAspect === 4 / 5 ? s.active : ''}`}
                    >
                        <span>5:4</span>
                        <Rectangle18x26Icon isActive={currentAspect === 4 / 5} />
                    </div>
                    <div
                        onClick={() => handleAspectChange(16 / 9)}
                        className={`${s.aspectRatioContainer} ${currentAspect === 16 / 9 ? s.active : ''}`}
                    >
                        <span>16:9</span>
                        <Rectangle20x26Icon isActive={currentAspect === 16 / 9} />
                    </div>
                </div>
            )}

            <ImageCropper
                key={`${activeIndex}-${currentAspect}`}
                image={images[activeIndex]}
                aspect={currentAspect === 'original' ? undefined : currentAspect}
                onCropComplete={handleCropComplete}
            />

            {/* кнопки перелистывания фоток */}
            {hasMultipleImages && (
                <div className={s.navigationButtons}>
                    {activeIndex > 0 && (
                        <Button
                            onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                            className={s.prevBtn}
                        >
                            <Image src={arrow} alt="Previous" />
                        </Button>
                    )}

                    {activeIndex < images.length - 1 && (
                        <Button
                            onClick={() => setActiveIndex((prev) => Math.min(prev + 1, images.length - 1))}
                            className={s.nextBtn}
                        >
                            <Image src={arrow} alt="Next" />
                        </Button>
                    )}
                </div>
            )}

            {/* кнопка отображения миниатюр */}
            <Button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className={`${s.toggleThumbnailsBtn} ${showThumbnails ? s.active : ''}`}
            >
                <ImagePreviewIcon />
            </Button>

            {/* миниатюры */}
            {showThumbnails && (
                <div className={s.thumbnailGallery}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`${s.thumbnailWrapper} ${activeIndex === index ? s.active : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={img} alt={`Thumbnail ${index}`} className={s.thumbnail} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImagesCropper;