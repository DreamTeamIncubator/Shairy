import { JSX, type ReactNode } from 'react';
import s from './Typography.module.scss'


type TypographyProps = {
  variant:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regularText16'
    | 'boldText16'
    | 'regularText14'
    | 'mediumText14'
    | 'boldText14'
    | 'smallText'
    | 'semiBoldSmallText'
    | 'regularLink'
    | 'smallLink';
  children: ReactNode;
}

export const Typography = ({ variant, children}: TypographyProps) => {

  const Tag: keyof JSX.IntrinsicElements =
    variant === 'regularLink' || variant === 'smallLink'
      ? 'a'
      : (variant === 'h1' || variant === 'h2' || variant === 'h3')
        ? variant
        : 'p';

  return (
   <Tag className={s[variant]}>{children}</Tag>
  );
};
