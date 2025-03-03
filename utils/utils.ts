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
