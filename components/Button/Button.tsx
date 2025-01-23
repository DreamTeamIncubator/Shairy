import { ComponentPropsWithoutRef } from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'textButton';
  active? : boolean;
};

export const Button = ({ variant = 'primary', className, active = false,...props }: ButtonProps) => {
  return <button className={clsx(s.button, s[variant], active && s.active,className)} {...props} />
}

// export const Button = ({ variant = 'primary', className, active = false, ...props }: ButtonProps) => {
//   const buttonClass = `
//     ${s.button}
//     ${variant === 'primary' ? s.primary : ''}
//     ${variant === 'secondary' ? s.secondary : ''}
//     ${variant === 'outlined' ? s.outlined : ''}
//     ${variant === 'textButton' ? s.textButton : ''}
//     ${active ? s.active : ''}
//     ${className || ''}
//   `;
//
//   return (
//     <button className={buttonClass} {...props} />
//   );
// };
