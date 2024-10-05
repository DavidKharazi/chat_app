import {
  DIGIT_REGEX,
  emailRegex,
  MIN_PASSWORD_LENGTH,
  SPECIAL_CHAR_REGEX,
  UPPER_CASE_REGEX,
  VALID_CHARACTERS_REGEX,
} from "./regexPatterns";
import {
  BaseFormValues,
  LoginFormValues,
  RegisterFormValues,
} from "../Types/FormTypes";
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
  } else if (!VALID_CHARACTERS_REGEX.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_LATIN_CHAR;
  }
  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues) => {
  const errors: Partial<RegisterFormValues> = {};

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
  } else if (!VALID_CHARACTERS_REGEX.test(values.password)) {
    errors.password = ErrorMessages.PASSWORD_LATIN_CHAR;
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = ErrorMessages.PASSWORD_MISMATCH;
  }

  return errors;
};

export const validateResetPasswordForm = (values: BaseFormValues) => {
  const errors: Partial<RegisterFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email = ErrorMessages.INVALID_EMAIL;
  }

  return errors;
};
