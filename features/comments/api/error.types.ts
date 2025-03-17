export type ErrorMessage = {
    message: string;
    field: string;
};

export type ApiErrorResponse = {
    statusCode: number;
    messages: ErrorMessage[];
    error: string;
};
