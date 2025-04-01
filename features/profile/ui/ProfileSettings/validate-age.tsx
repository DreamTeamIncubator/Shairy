// 'use server';
//
// export type AgeValidationResult = {
//     isValid: boolean;
//     message?: string;
//     privacyPolicyLink?: boolean;
// };
//
// export const validateAge = async (dateOfBirth: string | undefined): Promise<AgeValidationResult> => {
//     if (!dateOfBirth) return { isValid: true };
//
//     console.log('Received dateOfBirth:', dateOfBirth);
//
//     const [day, month, year] = dateOfBirth.split('.').map(Number);
//     const birthDate = new Date(year, month - 1, day);
//     const today = new Date();
//
//     if (birthDate > today) {
//         return {
//             isValid: false,
//             message: 'Дата рождения не может быть в будущем'
//         };
//     }
//
//     const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
//     if (birthDate > minAgeDate) {
//         return {
//             isValid: false,
//             message: 'A user under 13 cannot create a profile.',
//             privacyPolicyLink: true
//         };
//     }
//
//     return { isValid: true };
// };

'use server';

export type AgeValidationResult = {
    isValid: boolean;
    message?: string;
    privacyPolicyLink?: boolean;
};

export const validateAge = async (dateOfBirth: string | undefined): Promise<AgeValidationResult> => {
    if (!dateOfBirth) return { isValid: true };

    try {
        // Парсим дату в формате DD/MM/YYYY
        const [day, month, year] = dateOfBirth.split('/').map(Number);

        // Проверяем валидность компонентов даты
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
            return { isValid: false, message: 'Некорректная дата' };
        }

        const birthDate = new Date(year, month - 1, day);

        // Дополнительная проверка на корректность Date объекта
        if (isNaN(birthDate.getTime()) ||
            birthDate.getDate() !== day ||
            birthDate.getMonth() !== month - 1 ||
            birthDate.getFullYear() !== year) {
            return { isValid: false, message: 'Некорректная дата' };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const minAgeDate = new Date(today);
        minAgeDate.setFullYear(today.getFullYear() - 13);

        if (birthDate > minAgeDate) {
            return {
                isValid: false,
                message: 'Пользователь младше 13 лет не может создать профиль',
                privacyPolicyLink: true
            };
        }

        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: 'Ошибка при проверке возраста' };
    }
};
