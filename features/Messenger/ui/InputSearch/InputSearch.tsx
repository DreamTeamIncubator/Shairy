'use-client'

import { SearchIcon } from '@/assets/icons/SearchIcon'
import s from './InputSearch.module.scss'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

type InputSearchProps = {
  setSearchValue: (value: string) => void
}

export const InputSearch = ({ setSearchValue }: InputSearchProps) => {
  const [inputValue, setInputValue] = useState('')

  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    setSearchValue(debouncedValue)
  }, [debouncedValue])

  return (
    <div className={s.container}>
      <input
        type="text"
        name="search"
        placeholder="Input search"
        className={s.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span className={s.icon}>
        <SearchIcon />
      </span>
    </div>
  )
}
