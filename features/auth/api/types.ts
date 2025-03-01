export type RegistrationRequest = {
  userName: string;
  email: string;
  password: string;
  baseUrl: string;
};

export type RegistrationConfirmationRequest = {
  confirmationCode: string;
};

export type RegistrationEmailResend = {
  email: string;
  baseUrl: string;
};

export type ResponseError = {
  statusCode: number;
  messages: { message: string; field: string }[];
  error: string;
};
