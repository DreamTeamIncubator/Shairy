'use client';

import styles from './page.module.css';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Pagination } from '@/components/Pagination/Pagination';
import { useState } from 'react';
import { RadixTabs } from '@/components/Tabs/Tabs';
import { ReCaptcha } from '@/components/ReCaptcha/ReCaptcha';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPageOptions] = useState<number>(50);
  const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

  const tabs = [
    {
      value: 'tab1',
      label: 'Account',
      content: (
        <div>
          <h2>Account Details</h2>
          <p>Here you can update your account information.</p>
        </div>
      ),
    },
    {
      value: 'tab2',
      label: 'Password',
      content: (
        <div>
          <h2>Change Your Password</h2>
          <p>Enter your new password below.</p>
          <form>
            <div>
              <label htmlFor="oldPassword">Old Password:</label>
            </div>
            <div>
              <label htmlFor="newPassword">New Password:</label>
            </div>
          </form>
        </div>
      ),
    },
    {
      value: 'tab3',
      label: 'Registration',
      content: <h2>SomeBigForm</h2>,
    },
  ];

  return (
    <>
      <div className={styles.content}>
        <div>
          <div style={{ display: 'flex', marginTop: '30px', flexDirection: 'column', gap: '30px' }}>
            <Button>Полетели ) </Button>
            <Button variant={'secondary'}>Полетели ) </Button>
            <Button variant={'outlined'}>Полетели ) </Button>
            <Button variant={'textButton'}>Полетели ) </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Input placeholder={'Epam@epam.com'} variant={'email'} className={'active'} />
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon disabled={true} />
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon />
          <Input variant={'search'} />
          <Input variant={'search'} disabled />
          <Input variant={'search'} error={'Error text'} className={'error'} />
        </div>
        <div>
          <Pagination
            count={30}
            onChange={setCurrentPage}
            page={currentPage}
            siblings={1}
            perPage={perPage}
            perPageOptions={[10, 20, 30, 40, 50, 100]}
            onPerPageChange={(perPage) => setPerPageOptions(perPage)}
          />
        </div>
        <div style={{ marginTop: '50px' }}>
          <RadixTabs tabs={tabs} defaultValue="tab1" />
        </div>
        <ReCaptcha sitekey={sitekey} changeCaptchaStatus={setIsCaptchaCompleted} />
        <button
          disabled={!isCaptchaCompleted}
          onClick={() => isCaptchaCompleted && alert('сработало')}>
          тут кнопка для проверки работы
        </button>
      </div>
    </>
  );
}
