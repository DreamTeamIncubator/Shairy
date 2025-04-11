'use client'
import { useRouter } from 'next/navigation'
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import LogOutForm from '@/features/auth/ui/logOutFom/LogOutForm'
import { useTranslationData } from '@/hooks/useTranslationData'

export default function LogOut() {
  const router = useRouter()
  const { localeData } = useTranslationData()
  const handleClose = () => {
    router.back()
  }

  return (
    <ModalRadix modalTitle={localeData?.common.logOutModal.title} open={true} onClose={handleClose}>
      <LogOutForm setFalse={handleClose} />
    </ModalRadix>
  )
}
