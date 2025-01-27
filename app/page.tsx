import styles from './page.module.css';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';
import { Button } from '@/components/Button/Button';
import {Input} from '@/components/Input/Input';

export default function Home() {
  return (
    <>
      <h1 style={{marginBottom: '30px', textAlign: 'center'}}>DreamTeam - Летим</h1>
      <div className={styles.page}>
        <Sidebar elements={sidebarItems} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Button>Полетели ) </Button>
          <Button variant={'secondary'}>Полетели ) </Button>
          <Button variant={'outlined'}>Полетели ) </Button>
          <Button variant={'textButton'}>Полетели ) </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Input placeholder={'Epam@epam.com'} variant={'email'} className={'active'}/>
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon disabled={true}/>
          <Input placeholder={'Epam@epam.com'} variant={'email'} showIcon/>
          <Input  variant={'search'} />
          <Input  variant={'search'} disabled/>
          <Input  variant={'search'} error={'Error text'} className={'error'}/>
        </div>
      </div>
    </>
  );
}
