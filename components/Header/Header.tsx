import { Button } from '../Button/Button';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.content}>
        <h2>Shairy</h2>
        <div className={s.navigate}>
          <select className={s.select}>
            <option>English</option>
          </select>
          <div>
            <Button variant={'secondary'} className={s.btn}>
              Log in
            </Button>
            <Button variant={'primary'} className={s.btn}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
