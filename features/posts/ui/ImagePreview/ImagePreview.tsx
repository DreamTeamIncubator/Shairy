import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './ImagePreview.module.scss'

type Props = {
    images: string[];
    activeIndex: number;
    onSlideChange: (index: number) => void;
    selectedFilter?: string;
};

const ImagePreview = ({ images, activeIndex, onSlideChange, selectedFilter }: Props) => {
    return (
        <div className={s.previewWrapper}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                loop={false}
                className="w-full"
                initialSlide={activeIndex}
                onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={image}
                            alt={`Preview ${index}`}
                            width={490}
                            height={490}
                            className="rounded-lg"
                            style={{
                                filter: selectedFilter,
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImagePreview;

