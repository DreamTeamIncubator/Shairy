import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { StoreWrapper } from '@/store/store-wrapper'
import { Header } from '@/widgets/Header/Header'
import { Sidebar, sidebarItems } from '@/widgets/Sidebar/Sidebar'
import { Scroll } from '@/shared/ui/Scroll/Scroll'
import styles from '@/app/page.module.css'
import { ClientLoader } from '@/shared/ui/ClientLoader/ClientLoader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Shairy',
  description: 'Shairy',
}

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreWrapper>
          <ClientLoader>
            <Header />
            <div className={styles.page}>
              <Sidebar elements={sidebarItems} />
              <Scroll style={{ height: '100vh', overflow: 'hidden' }}>{children}</Scroll>
            </div>
          </ClientLoader>
        </StoreWrapper>
      </body>
    </html>
  )
}
