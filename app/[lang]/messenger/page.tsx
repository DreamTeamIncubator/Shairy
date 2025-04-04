// import styles from '../page.module.css';
import React from 'react'
import { getDictionary } from '../dictionaries'

export default async function Messenger({ params }: { params: Promise<{ lang: 'en' | 'ru' }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang) // en
  /// код выше на случай если пригодится отрисовывать перевод в серверной компоненте

  return <div>Messe</div>
} // Add to Cart
