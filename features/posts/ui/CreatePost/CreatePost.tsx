'use client';

import s from './CreatePost.module.scss';
import {useCreatePostLogic} from '@/features/posts/hooks/useCreatePostLogic';
import ImageUploader from '@/features/posts/ui/ImageUploader/ImageUploader';
import ImagesCropper from '@/features/posts/ui/ImageCropper/ImagesCropper';
import PhotoFilters from '@/features/posts/ui/PhotoFilters/PhotoFilters';
import ImagePreview from '@/features/posts/ui/ImagePreview/ImagePreview';
import DescriptionForm from '@/features/posts/ui/CreatePostForm/CreatePostForm';

type Props = ReturnType<typeof useCreatePostLogic>;

export const CreatePost = (
    {
        currentStep,
        images,
        activeIndex,
        description,
        croppedImages,
        filteredImages,
        setImages,
        setActiveIndex,
        setDescription,
        setCroppedImages,
        setFilteredImages,
        onPublish,
    }: Props) => {
    const imageUrls = images.map((img) => URL.createObjectURL(img));

    return (
        <div className={s.createPostWrapper}>
            {currentStep === 1 && (
                <ImageUploader
                    setImages={setImages}
                />
            )}

            {currentStep === 2 && images.length > 0 && (
                <ImagesCropper
                    images={imageUrls}
                    onCropComplete={(img, idx) => {
                        const updated = [...croppedImages];
                        updated[idx] = img;
                        setCroppedImages(updated);
                    }}
                />
            )}

            {currentStep === 3 && (
                <PhotoFilters
                    images={croppedImages}
                    onFilteredImages={setFilteredImages}
                />
            )}

            {currentStep === 4 && (
                <div className={s.publishWrapper}>
                    <ImagePreview
                        activeIndex={activeIndex}
                        onSlideChange={setActiveIndex}
                        images={filteredImages}
                    />
                    <DescriptionForm
                        onPublish={onPublish}
                        description={description}
                        setDescription={setDescription}
                    />
                </div>
            )}
        </div>
    );
};