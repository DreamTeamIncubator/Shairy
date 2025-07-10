'use-client'

import { SearchIcon } from '@/assets/icons/SearchIcon'
import s from './InputSearch.module.scss'
import { useState } from 'react'

type InputSearchProps = {
  setSearchValue: (value: string) => void
}

export const InputSearch = ({ setSearchValue }: InputSearchProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    console.log(inputValue)
    setSearchValue(inputValue)
  }

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
      <span className={s.icon} onClick={handleSearch}>
        <SearchIcon />
      </span>
    </div>
  )
}
