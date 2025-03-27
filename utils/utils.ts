// paths

export const paths = {
  auth: {
    signup: '/auth/sign-up',
    login: '/auth/login',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/reset-password',
    termsOfService: '/auth/terms',
    privacyPolicy: '/auth/privacy',
  },
  home: '/home',
  profile: '/my-profile',
  favorites: '/favorites',
  messenger: '/messenger',
  search: '/search',
}

// validation

export const validationPatterns = {
  username: /^[a-zA-Z0-9_]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/,
}
export function formatTimeAgo(isoDate: string) {
  const date = new Date(isoDate)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}
