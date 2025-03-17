'use client'

import { useState } from 'react';
import Image from 'next/image';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { Button } from '@/shared/ui/Button/Button';
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix';
import s from './EditPost.module.scss';


type EditPostProps = {
    post: any;
    description: string;
    setDescription: (description:string) => void;
    onSave: () => void;
    setEditMode: (edit: boolean) => void;
};

const EditPost = ({ post, description, setDescription, onSave, setEditMode }: EditPostProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [originalDescription, setOriginalDescription] = useState(description);
    

    const handleCancelEdit = () => {
        setDescription(originalDescription);
        setEditMode(false);
    };

    const handleSave = () => {
        onSave()
    }

    return (
        <div className={s.postContainer}>
            <span className={s.editPostTitle}>Edit Post</span>
            <div className={s.editMode}>
            {post?.images?.[0]?.url && (
                <img src={post.images[0].url} alt="image" className={s.image} />
            )}
            </div>
            <Image 
                    src='/close.svg' 
                    alt='close edit' 
                    width={24} 
                    height={24} 
                    className={s.icon} 
                    onClick={() => setIsModalOpen(true)} 
                />
                 <div className={s.description}>
                    <div className={s.avatarNameContainer}>
                            {post?.avatarOwner && (
                                <img src={post.avatarOwner} alt='Avatar' className={s.avatar} />
                            )}
                            <span className={s.userName}>{post?.userName}</span>
                        </div>
                        <div className={s.editTextAreaContainer}>
                            <TextArea
                                label='Add publication descriptions'
                                className={s.textArea}
                                value={description} 
                                onChange={(e) => setDescription(e.currentTarget.value)}
                                showCharacterCount={true}
                            />
                            <Button className={s.saveButton} onClick={handleSave}>Save changes</Button>
                    </div>
                    </div>
            {isModalOpen && (
                <ModalRadix 
                    modalTitle='Close Post' 
                    open={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                >
                    <span>Do you really want to close the edition of the publication? If you close, changes won’t be saved.</span>
                    <div className={s.buttonContainer}>
                        <Button variant='outlined' className={s.button} onClick={handleCancelEdit}>Yes</Button>
                        <Button className={s.button} onClick={() => setIsModalOpen(false)}>No</Button>
                    </div>
                </ModalRadix>
            )}
        </div>
    );
};

export default EditPost

