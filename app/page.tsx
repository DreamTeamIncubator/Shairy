'use client';

import styles from './page.module.css';
import { Button } from '@/components/Button/Button';
import {Input} from '@/components/Input/Input';
import {Pagination} from '@/components/Pagination/Pagination';
import {useState} from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>DreamTeam - Летим</h1> */}
      <div>
        <div className={styles.page}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <Button>Полетели ) </Button>
            <Button variant={'secondary'}>Полетели ) </Button>
            <Button variant={'outlined'}>Полетели ) </Button>
            <Button variant={'textButton'}>Полетели ) </Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Input placeholder={'Epam@epam.com'} variant={'email'} className={'active'}/>
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon disabled={true}/>
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon/>
          <Input  variant={'search'} />
          <Input  variant={'search'} disabled/>
          <Input  variant={'search'} error={'Error text'} className={'error'}/>
        </div>
        <div>
          <Pagination count={30} onChange={setCurrentPage} page={currentPage} siblings={1} />
        </div>
      </div>
    </>
  );
}
