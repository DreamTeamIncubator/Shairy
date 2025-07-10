import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Input.module.scss'
import { EyeIcon } from '@/assets/icons/EyeIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'

type Props = ComponentPropsWithoutRef<'input'> & {
  variant?: 'email' | 'search'
  error?: string
  showIcon?: boolean
  onIconClick?: () => void
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  variant = 'email',
  className,
  error,
  showIcon = false,
  disabled,
  onIconClick,
  value,
  onChange,
  ...rest
}: Props) => {
  const Icon = variant === 'search' ? SearchIcon : showIcon ? EyeIcon : null
  const classNames = {
    error: s.errorInput,
    input: clsx(s.input, s[variant], className, { [s.errorInput]: error }),
  }

  return (
    <div className={s.inputWrap}>
      <input
        className={classNames.input}
        placeholder={variant === 'search' ? 'Input search' : ''}
        value={value}
        onChange={onChange}
        {...rest}
        disabled={disabled}
      />
      {Icon && (
        <Icon
          onClick={onIconClick}
          className={clsx(
            s.icon,
            variant === 'search' ? s.iconSearch : s.iconEmail,
            disabled ? s.disabled : ''
          )}
        />
      )}

      {!!error && <span className={s.error}>{error}</span>}
    </div>
  )
}
