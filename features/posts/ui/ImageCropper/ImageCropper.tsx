// 'use client'
//
// import React, { useRef, useEffect, useState } from 'react';
// import s from './ImagesCropper.module.scss';
//
// type Props = {
//     image: string;
//     onCropComplete: (croppedImage: string) => void;
//     aspect: number | undefined;
// };
//
// const ImageCropper = ({ image, onCropComplete, aspect }: Props) => {
//     const imgRef = useRef<HTMLImageElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//
//     const handleCrop = () => {
//         if (!imgRef.current || !canvasRef.current || !isLoaded) return;
//
//         const img = imgRef.current;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;
//
//         const imgAspect = img.naturalWidth / img.naturalHeight;
//         let cropWidth, cropHeight;
//
//         if (aspect) {
//             if (imgAspect > aspect) {
//                 cropHeight = img.naturalHeight;
//                 cropWidth = cropHeight * aspect;
//             } else {
//                 cropWidth = img.naturalWidth;
//                 cropHeight = cropWidth / aspect;
//             }
//         } else {
//             cropWidth = img.naturalWidth;
//             cropHeight = img.naturalHeight;
//         }
//
//         const x = (img.naturalWidth - cropWidth) / 2;
//         const y = (img.naturalHeight - cropHeight) / 2;
//
//         canvas.width = cropWidth;
//         canvas.height = cropHeight;
//
//         ctx.drawImage(
//             img,
//             x, y, cropWidth, cropHeight,
//             0, 0, cropWidth, cropHeight
//         );
//
//         const newSrc = canvas.toDataURL('image/jpeg');
//         onCropComplete(newSrc);
//     };
//
//     useEffect(() => {
//         if (isLoaded) {
//             handleCrop();
//         }
//     }, [aspect, isLoaded]);
//
//     return (
//         <div className={s.imageCropWrapper}>
//             <img
//                 ref={imgRef}
//                 src={image}
//                 alt="Croppable"
//                 onLoad={() => setIsLoaded(true)}
//                 className={s.croppedImage}
//                 onError={() => setIsLoaded(false)}
//             />
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
//         </div>
//     );
// };
//
// export default ImageCropper;



'use client'
import React, { useRef, useEffect, useState } from 'react';
import s from './ImagesCropper.module.scss';

type Props = {
    image: string;
    aspect: number | undefined;
    onCropComplete?: (croppedImage: string) => void;
};

const ImageCropper = ({ image, aspect, onCropComplete }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [previewUrl, setPreviewUrl] = useState(image);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Оригинал без обрезки
            if (!aspect) {
                setPreviewUrl(image);
                return;
            }

            // Вычисляем параметры обрезки
            const imgAspect = img.width / img.height;
            let cropWidth, cropHeight;

            if (imgAspect > aspect) {
                cropHeight = img.height;
                cropWidth = cropHeight * aspect;
            } else {
                cropWidth = img.width;
                cropHeight = cropWidth / aspect;
            }

            const x = (img.width - cropWidth) / 2;
            const y = (img.height - cropHeight) / 2;

            canvas.width = cropWidth;
            canvas.height = cropHeight;

            ctx.drawImage(
                img,
                x, y, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight
            );

            const croppedUrl = canvas.toDataURL('image/jpeg');
            setPreviewUrl(croppedUrl);
            if (onCropComplete) onCropComplete(croppedUrl);
        };
    }, [image, aspect]);

    return (
        <div className={s.imageCropWrapper}>
            <img
                src={previewUrl}
                alt="Preview"
                className={s.croppedImage}
            />
        </div>
    );
};

export default ImageCropper;