'use client'

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Button} from '@/shared/ui/Button/Button';
import noAvatar from '@/public/no-avatar.svg'
import s from '../generalInformation.module.scss'
import {ModalRadix} from '@/shared/ui/Modal/ModalRadix';
import AvatarUploader from '@/features/edit-profile/ui/generalInformation/avatarUploader/AvatarUploader';
import {useDeleteAvatarMutation, useGetProfileQuery} from '@/features/profile/api/profileApi';
import close from '@/public/close.svg'
import {publicProfile} from '@/features/profile/api/publicProfile';
import {useAppDispatch} from '@/store/store';

const AddAvatar = () => {
    const [isOpenUploader, setIsOpenUploader] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const {data, refetch} = useGetProfileQuery()
    const [deleteAvatar] =useDeleteAvatarMutation()
    const dispatch = useAppDispatch()

    const avatar = data?.avatars[0]?.url ??  noAvatar

    const addPhotoHandler = () => {
        setIsOpenUploader(true)
    }
    const handleUploadComplete = () => {
        refetch()
    };

    const confirmDelete = async() =>{
        await deleteAvatar()
        setIsOpenModal(false)

        dispatch(publicProfile.util.invalidateTags(['profile']));
    }

    useEffect(() => {
        if (data?.avatars && data?.avatars?.length > 0) {
            refetch();
        }
    }, [data, refetch]);


    return (
        <div className={s.profileAvatar}>
            <div className={s.imageContainer}>
                {avatar !== noAvatar ?
                    <div className={s.closeButton} onClick={()=>setIsOpenModal(true)}>
                        <Image src={close} width={16} height={16} alt={'close'}/>
                    </div>  : ''}
                <Image src={avatar} alt={'avatar'} width={48} height={48} className={avatar === noAvatar ? '' : s.image}/>
            </div>
            <Button variant={'outlined'} onClick={addPhotoHandler}>Add a Profile Photo</Button>

            {/*uploader*/}
            <ModalRadix open={isOpenUploader} onClose={() => setIsOpenUploader(false)} modalTitle={'Add a Profile Photo'}>
                <AvatarUploader setIsOpen={setIsOpenUploader} handleUploadComplete={handleUploadComplete}/>
            </ModalRadix>

            {/*modal*/}
            <ModalRadix open={isOpenModal} onClose={()=>setIsOpenModal(false)} modalTitle={'Delete Photo'}>
                <div className={s.deleteModalText}>Are you sure you want to delete the photo?</div>
                <div className={s.buttonWrap}>
                    <Button variant={'outlined'} onClick={confirmDelete}>Yes</Button>
                    <Button variant={'primary'} onClick={()=>setIsOpenModal(false)}>No</Button>
                </div>
            </ModalRadix>
        </div>
    );
};

export default AddAvatar;