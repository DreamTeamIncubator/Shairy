'use client';

import { useState, useEffect } from 'react';
import { useUploadImageMutation, useCreatePostMutation } from '@/features/posts/api/post';
import { useGetMeQuery } from '@/features/auth/api/auth';
import { useAppDispatch } from '@/store/store';
import { postAPI } from '@/features/posts/api/post';
import { ResponseAllPosts } from '@/features/posts/api/post.types';

type UploadedImage = {
    uploadId: string
};

type PublishResult = {
    success: boolean
    error?: unknown
};

export const useCreatePostLogic = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [images, setImages] = useState<File[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [croppedImages, setCroppedImages] = useState<string[]>([]);
    const [filteredImages, setFilteredImages] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const steps = ['Add photo', 'Cropping', 'Filters', 'Publish'];

    const [uploadImage] = useUploadImageMutation();
    const [createPost] = useCreatePostMutation();
    const { data: userData } = useGetMeQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (images.length > 0) {
            const urls = images.map((img) => URL.createObjectURL(img));
            setCroppedImages(urls);
            setCurrentStep(2);
        }
    }, [images]);

    const onPublish = async (): Promise<PublishResult> => {
        if (!filteredImages.length || !userData) {
            return { success: false, error: 'No images or user data' };
        }

        try {
            const formData = new FormData();
            for (let i = 0; i < filteredImages.length; i++) {
                const blob = await fetch(filteredImages[i]).then((res) => res.blob());
                formData.append('file', blob, `image-${i}.jpg`);
            }

            const uploadResponse = await uploadImage(formData).unwrap();
            if (!uploadResponse.images?.length) throw new Error('Upload failed');

            const newPost = await createPost({
                description,
                childrenMetadata: uploadResponse.images.map((img: UploadedImage) => ({ uploadId: img.uploadId })),
            }).unwrap();

            dispatch(
                postAPI.util.updateQueryData(
                    'getAllUsersPosts',
                    { pageSize: 8, endCursorPostId: null, userId: userData.userId },
                    (draft: ResponseAllPosts) => {
                        draft.items.unshift(newPost);
                    }
                )
            );

            resetState();
            return { success: true };
        } catch (error) {
            console.error('Publish error:', error);
            return { success: false, error };
        }
    };

    const resetState = () => {
        setImages([]);
        setDescription('');
        setCroppedImages([]);
        setFilteredImages([]);
        setCurrentStep(1);
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return {
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
    };
};
