import React, { useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import s from './ImagesCropper.module.scss';

type Props = {
    image: string
    crop: Crop
    onCropChange: (crop: Crop) => void
    onCropComplete: (croppedImage: string) => void
};

const ImageCropper = ({ image, crop, onCropChange, onCropComplete }: Props) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleCropComplete = (pixelCrop: PixelCrop) => {
        if (!imgRef.current || !canvasRef.current) return;

        const imageElement = imgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Рассчитываем соотношение размеров изображения
        const scaleX = imageElement.naturalWidth / imageElement.width;
        const scaleY = imageElement.naturalHeight / imageElement.height;

        // Устанавливаем размеры холста в соответствии с обрезанной областью
        canvas.width = pixelCrop.width * scaleX;
        canvas.height = pixelCrop.height * scaleY;

        // Рисуем обрезанную область на холсте
        ctx.drawImage(
            imageElement,
            pixelCrop.x * scaleX,
            pixelCrop.y * scaleY,
            pixelCrop.width * scaleX,
            pixelCrop.height * scaleY,
            0,
            0,
            pixelCrop.width * scaleX,
            pixelCrop.height * scaleY
        );

        // Получаем обрезанное изображение в формате base64
        const croppedImage = canvas.toDataURL('image/jpeg');
        onCropComplete(croppedImage);
    };

    return (
        <div className={s.imageCropWrapper}>
            <ReactCrop
                className={s.reactCrop}
                crop={crop}
                onChange={onCropChange}
                onComplete={handleCropComplete}
                aspect={1} // Соотношение сторон
            >
                <img
                    ref={imgRef}
                    src={image}
                    alt="Croppable"
                    className={s.croppedImage}
                    style={{ maxWidth: '100%', height: 'auto' }} // Убедимся, что изображение масштабируется
                />
            </ReactCrop>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default ImageCropper;