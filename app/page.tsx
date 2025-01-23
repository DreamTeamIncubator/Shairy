import styles from './page.module.css';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';
import { Button } from '@/components/Button/Button';

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
      </div>
    </>
  );
}
