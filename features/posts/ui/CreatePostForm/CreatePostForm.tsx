import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button/Button';
import s from './CreatePostForm.module.scss';
import Image from 'next/image';
import image from '@/public/icons/image.svg';

type Props = {
    uploadedPhotos: { id: string; url: string }[];
    onClose: () => void;
    onPublish: () => void;
    description: string;
    setDescription: (description: string) => void;
};

const DescriptionForm = ({ uploadedPhotos, onClose, onPublish, description, setDescription }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ description: string }>();

    const onSubmit = (data: { description: string }) => {
        setDescription(data.description); // Обновляем описание
        onPublish(); // Вызываем публикацию
    };

    return (
        <div className={s.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className={s.userInfo}>
                        <Image src={image} alt={'avatar'} width={36} height={36} />
                        <span>URLProfile</span>
                    </div>
                    <div className={s.descriptionContainer}>
                        <p className={s.description}>Add publication descriptions</p>
                        <textarea
                            className={s.textarea}
                            {...register('description', { required: 'Описание обязательно' })}
                            placeholder="Введите описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className={s.descriptionInfo}>0/500</span>
                        {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
                    </div>
                </div>
                <Button className={s.submitBtn} variant={'textButton'} type="submit">
                    Опубликовать
                </Button>
            </form>
        </div>
    );
};

export default DescriptionForm;