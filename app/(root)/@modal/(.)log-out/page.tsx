'use client'

import { ModalRadix } from '@/components/Modal/ModalRadix';
import LogOutForm from '@/features/ui/logOutFom/LogOutForm';
import { useRouter } from 'next/navigation';

export default function LogOut() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <ModalRadix modalTitle={'Log Out'} open={true} onClose={handleClose}>
    <LogOutForm />
  </ModalRadix>
};
