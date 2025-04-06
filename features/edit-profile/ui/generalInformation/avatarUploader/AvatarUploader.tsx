'use client'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import s from '@/features/posts/ui/ImageUploader/ImageUploader.module.scss'
import style from './avatarUploader.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import noAvatar from '@/public/no-avatar.svg'
import {
  profileAPI,
  useGetProfileQuery,
  useUploadAvatarMutation,
} from '@/features/profile/api/profileApi'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
import { publicProfile } from '@/features/profile/api/publicProfile'

type Props = {
  setIsOpen: (isOpen: boolean) => void
  handleUploadComplete: () => void
}

type ExtendedFile = File & { preview: string }

const AvatarUploader = ({ setIsOpen, handleUploadComplete }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<ExtendedFile | null>(null)
  const [step, setStep] = useState(1)
  const { refetch } = useGetProfileQuery()
  const dispatch = useAppDispatch()

  const [uploadAvatar] = useUploadAvatarMutation()
  const router = useRouter()

  const saveAvatarHandler = async () => {
    const formData = new FormData()
    if (avatar) {
      formData.append('file', avatar)
    }
    await uploadAvatar(formData)

    dispatch(profileAPI.util.invalidateTags(['profile']))
    dispatch(publicProfile.util.invalidateTags(['profile']))

    handleUploadComplete()
    setIsOpen(false)
    router.back()
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        setAvatar(
          Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) })
        )
        setError(null)
        setStep(2)
      } else if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((file) => {
          const errors = file.errors.map((err) => {
            if (err.code === 'file-too-large') {
              return 'Photo size must be less than 10 MB!'
            }
            if (err.code === 'file-invalid-type') {
              return 'The format of the uploaded photo must be PNG or JPEG!'
            }
            return 'Unknown error occurred.'
          })
          return errors.join(' ')
        })

        setError(errorMessages.join(' '))
        return
      }

      setError(null)
    },
  })

  return (
    <>
      {error && (
        <div className={style.error}>
          <span>Error!</span>
          {error}
        </div>
      )}

      {step === 1 && (
        <div className={s.wrapper} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={s.content}>
            <Image src={noAvatar} alt="img" />
          </div>
          <div className={s.buttonsContainer}>
            <Button className={s.selectButton}>Select from Computer</Button>
          </div>
        </div>
      )}

      {step === 2 && avatar && (
        <div className={style.uploadSection}>
          <div className={style.avatarPreview}>
            <Image src={avatar.preview} alt={'avatar-photo'} width={330} height={340} />
          </div>
          <Button variant={'primary'} onClick={saveAvatarHandler}>
            Save
          </Button>
        </div>
      )}
    </>
  )
}

export default AvatarUploader
