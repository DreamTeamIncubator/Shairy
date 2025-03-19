import { useState, useEffect } from 'react';
import ImageUploader from '@/features/posts/ui/ImageUploader/ImageUploader';
import ImagePreview from '@/features/posts/ui/ImagePreview/ImagePreview';
import PhotoFilters from '@/features/posts/ui/PhotoFilters/PhotoFilters';
import DescriptionForm from '@/features/posts/ui/CreatePostForm/CreatePostForm';
import ImagesCropper from '@/features/posts/ui/ImageCropper/ImagesCropper';
import {useCreatePostMutation, useUploadImageMutation} from '@/features/posts/api/post';

type Props = {
    onClose: () => void;
    currentStep: number;
    onStepChange: (step: number) => void;
};

const CreatePost = ({ onClose, currentStep, onStepChange }: Props) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [filters, setFilters] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [croppedImages, setCroppedImages] = useState<string[]>([]);
    const [filteredImages, setFilteredImages] = useState<string[]>([]);

    const [uploadImage] = useUploadImageMutation();
    const [createPost] = useCreatePostMutation();

    // Инициализация croppedImages при загрузке изображений
    useEffect(() => {
        if (images.length > 0) {
            const urls = images.map((img) => URL.createObjectURL(img));
            setCroppedImages(urls);
            onStepChange(2); // Переходим к шагу Cropping
        }
    }, [images]);

    const handlePublish = async () => {
        if (filteredImages.length === 0) {
            alert('Сначала загрузите и обработайте изображения!');
            return;
        }

        try {
            // Шаг 1: Загружаем изображения
            const formData = new FormData();
            for (let i = 0; i < filteredImages.length; i++) {
                const img = filteredImages[i];
                const blob = await fetch(img).then((res) => res.blob());
                formData.append('file', blob, `image-${i}.jpg`);
            }

            const uploadResponse = await uploadImage(formData).unwrap();
            console.log('Upload response:', uploadResponse); // Проверяем ответ

            if (!uploadResponse.images || uploadResponse.images.length === 0) {
                throw new Error('Не удалось загрузить изображения');
            }

            const uploadedImages = uploadResponse.images;

            // Шаг 2: Создаем пост
            const postResponse = await createPost({
                description,
                childrenMetadata: uploadedImages.map((img: UploadedImage) => ({ uploadId: img.uploadId })),
            }).unwrap();

            console.log('Post created successfully:', postResponse);

            // Сброс состояний
            setImages([]);
            setCroppedImages([]);
            setFilteredImages([]);
            setDescription('');
            onStepChange(1);
            onClose();
        } catch (error) {
            console.error('Ошибка публикации:', error);
            alert('Произошла ошибка при публикации.');
        }
    };

    const handleCropComplete = (croppedImage: string, index: number) => {
        const updatedCroppedImages = [...croppedImages];
        updatedCroppedImages[index] = croppedImage;
        setCroppedImages(updatedCroppedImages);
    };

    const handleFilteredImages = (images: string[]) => {
        setFilteredImages(images);
    };

    const imageUrls = images.map((img) => URL.createObjectURL(img));

    return (
        <div>
            {currentStep === 1 && (
                <div>
                    <ImageUploader
                        setImages={(newImages) => setImages(newImages) }
                        setError={setError}
                    />
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    {images.length > 0 && (
                        <ImagesCropper
                            images={imageUrls}
                            onCropComplete={handleCropComplete}
                        />
                    )}
                </div>
            )}

            {currentStep === 3 && (
                <div>
                    <PhotoFilters
                        images={croppedImages}
                        onFilteredImages={handleFilteredImages}
                    />
                </div>
            )}

            {currentStep === 4 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '972px' }}>
                    <ImagePreview
                        images={filteredImages}
                        activeIndex={activeIndex}
                        selectedFilter={filters || ''}
                        onSlideChange={setActiveIndex}
                    />
                    <DescriptionForm
                        onPublish={handlePublish}
                        onClose={onClose}
                        uploadedPhotos={filteredImages.map((url, index) => ({
                            id: Date.now().toString() + index,
                            url,
                        }))}
                        description={description}
                        setDescription={setDescription}
                    />
                </div>
            )}
        </div>
    );
};

type UploadedImage = {
    uploadId: string;
};

export default CreatePost;
