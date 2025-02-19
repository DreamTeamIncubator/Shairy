'use client';

import { redirect } from 'next/navigation';
import { Button } from '../Button/Button';
import s from './Header.module.scss';
import { LanguageSelect } from '../Select/LanguageSelect/LanguageSelect';
import Link from 'next/link';

export const Header = () => {
  const SignUpForm = () => {
    redirect('/auth/sign-up');
  };
  
  return (
    <div className={s.header}>
      <div className={s.content}>
        <h2 className={s.text}>Shairy</h2>
        <div className={s.navigate}>
          <LanguageSelect />
          <div>
           <Link href='/login'>
            <Button variant={'textButton'} className={s.btn} >
              Log in
            </Button>
            </Link>
            <Button variant={'primary'} className={s.btn} onClick={SignUpForm}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
