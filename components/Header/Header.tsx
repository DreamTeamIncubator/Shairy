'use client';

import { redirect } from 'next/navigation';
import { Button } from '../Button/Button';
import s from './Header.module.scss';
import { LanguageSelect } from '../Select/LanguageSelect/LanguageSelect';

export const Header = () => {
  const loginForm = () => {
    redirect('/login');
  };
  const SignUpForm = () => {
    redirect('/sign-up');
  };
  
  return (
    <div className={s.header}>
      <div className={s.content}>
        <h2 className={s.text}>Shairy</h2>
        <div className={s.navigate}>
          <LanguageSelect />
          <div>
            <Button variant={'textButton'} className={s.btn} onClick={loginForm}>
              Log in
            </Button>
            <Button variant={'primary'} className={s.btn} onClick={SignUpForm}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
