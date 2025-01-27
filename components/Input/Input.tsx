import {ComponentPropsWithoutRef} from 'react';
import clsx from 'clsx';
import s from '@/components/Input/Input.module.scss';
import {EyeIcon} from '@/assets/icons/EyeIcon';
import {SearchIcon} from '@/assets/icons/SearchIcon';

type Props = ComponentPropsWithoutRef<'input'> & {
    variant?: 'email' | 'search'
    error?: string
    showIcon?: boolean
}

export const Input = ({variant = 'email', className,error, showIcon = false, disabled, ...rest}: Props) => {
    const Icon =
        variant === 'search' ? SearchIcon : showIcon ? EyeIcon : null;
    const classNames = {
        error: s.errorInput,
        input: clsx(s.input, s[variant],  className, { [s.errorInput]: error })

    }

    return (
        <div className={s.inputWrap}>
            <input className={classNames.input} placeholder={variant ==='search' ? 'Input search' : ''} {...rest} disabled={disabled}/>
            {Icon && <Icon className={clsx(s.icon, variant === 'search' ? s.iconSearch : s.iconEmail, disabled ? s.disabled : '')} />}

            {!!error && <span className={s.error}>{error}</span>}
        </div>
    )
};

