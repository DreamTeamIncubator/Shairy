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

// регулярки, валидация, ошибки для форм

export const patternsForSignUpForm = {
  username: /^[a-zA-Z0-9_]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/,
}

export const patternsForProfileSettingsForm = {
  username: /^[a-zA-Z0-9_-]+$/,
  name: /^[a-zA-Zа-яА-ЯёЁ]+$/,
  date: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
};

export const errorMessagesForProfileSettingsForm = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must not exceed ${max} characters`,
}

export const validationForProfileSettingsForm = {
  userName: {
    required: errorMessagesForProfileSettingsForm.required('Username'),
    minLength: {
      value: 6,
      message: errorMessagesForProfileSettingsForm.minLength('Username', 6)
    },
    maxLength: {
      value: 30,
      message: errorMessagesForProfileSettingsForm.maxLength('Username', 30)
    },
    pattern: {
      value: patternsForProfileSettingsForm.username,
      message: 'Only letters, numbers, underscore and hyphen are allowed'
    }
  },
  firstName: {
    required: errorMessagesForProfileSettingsForm.required('First name'),
    minLength: {
      value: 1,
      message: errorMessagesForProfileSettingsForm.minLength('First name', 1)
    },
    maxLength: {
      value: 50,
      message: errorMessagesForProfileSettingsForm.maxLength('First name', 50)
    },
    pattern: {
      value: patternsForProfileSettingsForm.name,
      message: 'Only letters are allowed'
    }
  },
  lastName: {
    required: errorMessagesForProfileSettingsForm.required('Last name'),
    minLength: {
      value: 1,
      message: errorMessagesForProfileSettingsForm.minLength('Last name', 1)
    },
    maxLength: {
      value: 50,
      message: errorMessagesForProfileSettingsForm.maxLength('Last name', 50)
    },
    pattern: {
      value: patternsForProfileSettingsForm.name,
      message: 'Only letters are allowed'
    }
  },
  dateOfBirth: {
    pattern: {
      value: patternsForProfileSettingsForm.date, // Проверка формата DD/MM/YYYY
      message: 'Invalid date format. Use DD/MM/YYYY.',
    },
  },
  country: {},
  city: {},
  aboutMe: {
    maxLength: {
      value: 200,
      message: errorMessagesForProfileSettingsForm.maxLength('About me', 200)
    }
  }
}

// Utility functions
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

// Date --> в строку
export const formatDateToDDMMYYYY = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`; // Разделитель изменен на "/"
};

// строку --> в Date
export const parseDateString = (dateStr: string): Date | undefined => {
  const [day, month, year] = dateStr.split('/').map(Number); // Разделитель изменен на "/"
  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? undefined : date;
}
