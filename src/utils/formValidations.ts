import {
  DIGIT_REGEX,
  emailRegex,
  MIN_PASSWORD_LENGTH,
  passwordRegex,
  SPECIAL_CHAR_REGEX,
  UPPER_CASE_REGEX,
} from "./regexPatterns";
import { LoginFormValues, RegisterFormValues } from "../Types/FormTypes";
import { ErrorMessages } from "./ErrorMessages";

export const validateLoginForm = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email = ErrorMessages.INVALID_EMAIL;
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = ErrorMessages.PASSWORD_LENGHT;
  } else if (!UPPER_CASE_REGEX.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_UPPERCASE;
  } else if (!DIGIT_REGEX.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_NUMBER;
  } else if (!SPECIAL_CHAR_REGEX.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_SPECIAL_CHAR;
  } else if (/\s/.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_SPACES;
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
