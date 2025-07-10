// import styles from '../page.module.css';
import React from 'react'
// import { getDictionary } from '../../../locales/dictionaries/dictionaries'
import { Messenger } from '@/features/Messenger/ui/Messenger'

export default async function MessengerPage() {
  // const { lang } = await params
  // const dict = await getDictionary(lang) // en
  /// код выше на случай если пригодится отрисовывать перевод в серверной компоненте

  return <Messenger />
} // Add to Cart
