import { NextResponse, NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'ru']
const defaultLocale = 'en'

// Кеш для хранения настроек локали
const localeCache = new Map()

function getLocale(request: NextRequest) {
  // 1. Проверяем куки (если пользователь уже выбирал язык)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Анализируем заголовки браузера
  const headers = { 'accept-language': request.headers.get('accept-language') || defaultLocale }
  const languages = new Negotiator({ headers }).languages()

  // 3. Сопоставляем с поддерживаемыми локалями
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Пропускаем статические файлы и API
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Проверяем, есть ли локаль в URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Обновляем куку, если локаль в URL отличается от текущей
    const urlLocale = pathname.split('/')[1]
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', urlLocale, { maxAge: 365 * 24 * 60 * 60 })
    return response
  }

  // Определяем локаль и делаем редирект
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 365 * 24 * 60 * 60 })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
