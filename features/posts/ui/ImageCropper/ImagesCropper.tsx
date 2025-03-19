import React, { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';
import s from './ImagesCropper.module.scss';
import Image from 'next/image';
import arrow from '../../../../public/icons/arrow.svg';

type Props = {
    images: string[];
    onCropComplete: (croppedImage: string, index: number) => void;
};

const ImagesCropper = ({ images, onCropComplete }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [crops, setCrops] = useState<{ unit: '%' | 'px'; width: number; height: number; x: number; y: number }[]>(
        images.map(() => ({ unit: '%', width: 50, height: 50, x: 25, y: 25 }))
    );

    const handleCropChange = (newCrop: any) => {
        setCrops((prevCrops) => {
            const newCrops = [...prevCrops];
            newCrops[activeIndex] = newCrop;
            return newCrops;
        });
    };

    const handleCropCompleteLocal = (croppedImage: string) => {
        onCropComplete(croppedImage, activeIndex);
    };

    // Проверяем, есть ли больше одной фотографии
    const hasMultipleImages = images.length > 1;

    return (
        <div className={s.imagesCropper}>
            {/* Активное изображение с рамкой обрезки */}
            <ImageCropper
                image={images[activeIndex]}
                crop={crops[activeIndex]}
                onCropChange={handleCropChange}
                onCropComplete={handleCropCompleteLocal}
            />

            {/* Кнопки навигации (отображаются только если фотографий больше одной) */}
            {hasMultipleImages && (
                <div className={s.navigationButtons}>
                    <button
                        onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                        className={s.prevBtn}
                    >
                        <Image src={arrow} alt="Previous" />
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => Math.min(prev + 1, images.length - 1))}
                        className={s.nextBtn}
                    >
                        <Image src={arrow} alt="Next" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImagesCropper;