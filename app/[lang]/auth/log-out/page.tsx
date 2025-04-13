'use client'
import { useRouter } from 'next/navigation'
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import LogOutForm from '@/features/auth/ui/logOutFom/LogOutForm'
import { useTranslation } from '@/locales/provider'

export default function LogOut() {
  const router = useRouter()
  const t = useTranslation().common
  const handleClose = () => {
    router.back()
  }

  return (
    <ModalRadix modalTitle={t.logOutModal.title} open={true} onClose={handleClose}>
      <LogOutForm setFalse={handleClose} />
    </ModalRadix>
  )
}
