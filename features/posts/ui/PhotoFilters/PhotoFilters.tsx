import { useState, useEffect, useRef } from 'react';
import ImagePreview from '@/features/posts/ui/ImagePreview/ImagePreview';
import s from './PhotoFilters.module.scss';

type Props = {
    images: string[];
    onFilteredImages: (images: string[]) => void;
};

const PhotoFilters = ({ images, onFilteredImages }: Props) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(new Array(images.length).fill('none'));
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState<boolean>(false); // Новое состояние
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const filters = [
        'grayscale(100%)',
        'sepia(100%)',
        'invert(100%)',
        'blur(5px)',
        'contrast(200%)',
    ];

    // Применение фильтра к изображению
    const applyFilterToImage = (imageUrl: string, filter: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            img.crossOrigin = 'anonymous'; // Для работы с CORS

            img.onload = () => {
                const canvas = canvasRef.current!;
                const ctx = canvas.getContext('2d')!;

                // Устанавливаем размеры canvas под размеры изображения
                canvas.width = img.width;
                canvas.height = img.height;

                // Применяем фильтр
                ctx.filter = filter;
                ctx.drawImage(img, 0, 0);

                // Получаем данные изображения с фильтром
                const filteredImageUrl = canvas.toDataURL('image/jpeg');
                resolve(filteredImageUrl);
            };
        });
    };

    // Обновление всех изображений с учетом фильтров
    const updateFilteredImages = async () => {
        try {
            setIsProcessing(true); // Блокируем переход
            const updatedImages = await Promise.all(
                images.map((image, index) => applyFilterToImage(image, selectedFilters[index]))
            );
            onFilteredImages(updatedImages); // Передаем обновленные изображения
        } catch (error) {
            console.error('Ошибка при обновлении изображений:', error);
        } finally {
            setIsProcessing(false); // Разблокируем переход
        }
    };

    // Обработчик изменения фильтра
    const handleFilterChange = async (filter: string) => {
        const newFilters = [...selectedFilters];
        newFilters[activeIndex] = filter;
        setSelectedFilters(newFilters);

        // Обновляем все изображения с учетом новых фильтров
        await updateFilteredImages();
    };

    const handleSlideChange = (index: number) => {
        setActiveIndex(index);
    };

    // Обновляем selectedFilters при изменении images
    useEffect(() => {
        setSelectedFilters(new Array(images.length).fill('none'));
    }, [images]);

    // Применяем фильтры при первом рендере и при изменении selectedFilters
    useEffect(() => {
        updateFilteredImages().catch((error) => {
            console.error('Ошибка при применении фильтров:', error);
        });
    }, [selectedFilters]);

    return (
        <div className={s.wrapper}>
            <div className={s.preview}>
                <ImagePreview
                    images={images}
                    selectedFilter={selectedFilters[activeIndex]}
                    activeIndex={activeIndex}
                    onSlideChange={handleSlideChange}
                />
            </div>

            <div className={s.filtersContainer}>
                {filters.map((filter) => (
                    <div
                        key={filter}
                        onClick={() => handleFilterChange(filter)}
                        className={s.filter}
                    >
                        <img
                            src={images[activeIndex]}
                            alt={`Filter preview for image ${activeIndex}`}
                            width={108}
                            height={108}
                            style={{
                                filter: filter,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Скрытый canvas для применения фильтров */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default PhotoFilters;
