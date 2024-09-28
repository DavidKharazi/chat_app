import { emailRegex, passwordRegex } from "./regexPatterns";
import { LoginFormValues, RegisterFormValues } from "../Types/FormTypes";
import { ErrorMessages } from "./ErrorMessages";

export const validateLoginForm = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email = ErrorMessages.INVALID_EMAIL;
  }

  if (!passwordRegex.test(values.password) || /\s/.test(values.password)) {
    errors.password = ErrorMessages.INVALID_PASSWORD;
  }

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues) => {
  const errors: Partial<RegisterFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email = ErrorMessages.INVALID_EMAIL;
  }

  if (!passwordRegex.test(values.password) || /\s/.test(values.password)) {
    errors.password = ErrorMessages.INVALID_PASSWORD;
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = ErrorMessages.PASSWORD_MISMATCH;
  }

  return errors;
};
