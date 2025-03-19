import {useDropzone} from 'react-dropzone';
import s from './ImageUploader.module.scss';
import {Button} from '@/shared/ui/Button/Button';
import image from '@/public/icons/image.svg';
import Image from 'next/image'
import React from 'react';

type Props = {
    setImages: React.Dispatch<React.SetStateAction<File[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
};

const ImageUploader = ({setImages, setError}: Props) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png']},
        maxSize: 20 * 1024 * 1024, // 20MB
        multiple: true,
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length > 0) {
                setImages((prevImages) => [...prevImages, ...acceptedFiles]);
                setError(null);
            } else {
                setError('The photo must be less than 20MB and in JPEG or PNG format');
            }
        },
    });

    return (
        <div className={s.wrapper} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={s.content}>
                <div className="image-placeholder">
                    <Image src={image} alt="img"/>
                </div>
            </div>
            <div className={s.buttonsContainer}>
                <Button className={s.selectButton}>Select from Computer</Button>
                <Button variant={'outlined'} className="draft-button">Open Draft</Button>
            </div>
        </div>
    )
};

export default ImageUploader;
