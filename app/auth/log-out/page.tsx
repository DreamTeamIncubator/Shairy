'use client'
import { useRouter } from 'next/navigation';
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix';
import LogOutForm from '@/features/auth/ui/logOutFom/LogOutForm';

export default function LogOut() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <ModalRadix modalTitle={'Log Out'} open={true} onClose={handleClose}>
    <LogOutForm />
  </ModalRadix>
};


