'use server';

export type AgeValidationResult = {
    isValid: boolean;
    message?: string;
    privacyPolicyLink?: boolean;
};

export const validateAge = async (dateOfBirth: string | undefined): Promise<AgeValidationResult> => {
    if (!dateOfBirth) return { isValid: true };

    const [day, month, year] = dateOfBirth.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
        return {
            isValid: false,
            message: 'Дата рождения не может быть в будущем'
        };
    }

    const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    if (birthDate > minAgeDate) {
        return {
            isValid: false,
            message: 'A user under 13 cannot create a profile.',
            privacyPolicyLink: true
        };
    }

    return { isValid: true };
};
