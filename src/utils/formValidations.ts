import { emailRegex, passwordRegex } from "./regexPatterns";
import { LoginFormValues, RegisterFormValues } from "./FormTypes";

export const validateLoginForm = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email =
      "Некорректный email (должен содержать @, точку, латинские буквы, пробелы запрещены)";
  }

  if (!passwordRegex.test(values.password) || /\s/.test(values.password)) {
    errors.password =
      'Пароль должен содержать не менее 8 символов, минимум 1 заглавную букву, 1 цифру, 1 спец. символ из [!@#$%^&*(),.?":{}|<>], пробелы запрещены';
  }

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues) => {
  const errors: Partial<RegisterFormValues> = {};

  if (!emailRegex.test(values.email) || /\s/.test(values.email)) {
    errors.email =
      "Некорректный email (должен содержать @, точку, латинские буквы, пробелы запрещены)";
  }

  if (!passwordRegex.test(values.password) || /\s/.test(values.password)) {
    errors.password =
      'Пароль должен содержать не менее 8 символов, минимум 1 заглавную букву, 1 цифру, 1 спец. символ из [!@#$%^&*(),.?":{}|<>], пробелы запрещены';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
};
