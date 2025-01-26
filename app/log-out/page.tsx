'use-client';
import { redirect } from 'next/navigation';

const LogOut = () => {
  redirect('/login');
};

export default LogOut;
