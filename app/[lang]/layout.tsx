import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { StoreWrapper } from '@/store/store-wrapper'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { Scroll } from '@/shared/ui/Scroll/Scroll'
import styles from '../[lang]/page.module.css'
import { ClientLoader } from '@/shared/ui/ClientLoader/ClientLoader'
import { getDictionary } from '../../locales/getDictionaries'
import { TranslationProvider } from '@/locales/provider'

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

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'ru' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const sidebarItems = {
    top: [
      { pathValue: 'home', title: dict.sidebar.home },
      { pathValue: 'create', title: dict.sidebar.create },
      { pathValue: 'my-profile', title: dict.sidebar.myProfile },
      { pathValue: 'messenger', title: dict.sidebar.messenger },
      { pathValue: 'search', title: dict.sidebar.search },
    ],
    main: [
      { title: dict.sidebar.statistic, pathValue: 'statistics' },
      { title: dict.sidebar.favorites, pathValue: 'favorites' },
    ],
    footer: [{ title: dict.sidebar.logOut, pathValue: 'log-out' }],
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreWrapper>
          <TranslationProvider value={dict}>
            <ClientLoader>
              <Header />
              <div className={styles.page}>
                <Sidebar sidebarItems={sidebarItems} />
                <Scroll style={{ height: '100vh', overflow: 'hidden' }}>{children}</Scroll>
              </div>
            </ClientLoader>
          </TranslationProvider>
        </StoreWrapper>
      </body>
    </html>
  )
}
