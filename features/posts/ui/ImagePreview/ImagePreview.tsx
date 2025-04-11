import React, {useState} from 'react';
import s from './ImagePreview.module.scss';
import arrow from '@/public/icons/arrow.svg';
import image from '@/public/icons/image.svg';
import Image from 'next/image';
import clsx from 'clsx';

type Props = {
    images: string[];
    activeIndex: number;
    onSlideChange: (index: number) => void;
    selectedFilter?: string;
};

const ImagePreview = ({images, activeIndex, onSlideChange, selectedFilter}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(activeIndex);
    const [showThumbnails, setShowThumbnails] = useState(false); // Состояние для управления видимостью миниатюр

    // Обработчик изменения слайда
    const handleSlideChange = (index: number) => {
        setCurrentIndex(index);
        onSlideChange(index);
    };

    // Переключение на предыдущее изображение
    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        handleSlideChange(newIndex);
    };

    // Переключение на следующее изображение
    const handleNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        handleSlideChange(newIndex);
    };

    // Переключение видимости миниатюр
    const toggleThumbnails = () => {
        setShowThumbnails((prev) => !prev);
    };

    const hasMultipleImages = images.length > 1;

    return (
        <div className={s.previewWrapper}>
            {/* Основное изображение */}
            <div className={s.mainImageContainer}>
                <img
                    src={images[currentIndex]}
                    alt={`Preview ${currentIndex}`}
                    width={490}
                    height={490}
                    style={{
                        filter: selectedFilter,
                    }}
                />
            </div>


            {hasMultipleImages &&
                (<div className={s.navigationButtons}>
                    <button className={s.prevBtn} onClick={handlePrev} disabled={images.length <= 1}>
                        <Image src={arrow} alt="Previous"/>
                    </button>
                    <button className={s.nextBtn} onClick={handleNext} disabled={images.length <= 1}>
                        <Image src={arrow} alt="Next"/>
                    </button>
                </div>)
            }
            {hasMultipleImages &&
                (<div className={s.paginationBullets}>
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={clsx(s.bullet, {
                                [s.active]: currentIndex === index,
                            })}
                            onClick={() => handleSlideChange(index)}
                        ></span>
                    ))}
                </div>)
            }


            {/*/!* Кнопка "Показать миниатюры" *!/*/}
            {/*<div className={s.thumbnailToggle} onClick={toggleThumbnails}>*/}
            {/*    <Image src={image} alt="imagePreview" />*/}
            {/*</div>*/}

            {/*/!* Миниатюры для переключения *!/*/}
            {/*{showThumbnails && (*/}
            {/*    <div className={s.thumbnailsContainer}>*/}
            {/*        {images.map((image, index) => (*/}
            {/*            <div*/}
            {/*                key={index}*/}
            {/*                className={`${s.thumbnail} ${currentIndex === index ? s.active : ''}`}*/}
            {/*                onClick={() => handleSlideChange(index)}*/}
            {/*            >*/}
            {/*                <Image*/}
            {/*                    src={image}*/}
            {/*                    alt={`Thumbnail ${index}`}*/}
            {/*                    width={80}*/}
            {/*                    height={82}*/}
            {/*                    style={{*/}
            {/*                        filter: selectedFilter,*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default ImagePreview;