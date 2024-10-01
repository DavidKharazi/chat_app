import { BASE_URL } from "./authService";

// Создаем enum для строк
enum ResetPasswordStrings {
  RESET_URL = `${BASE_URL}/reset-password-request`,
  USER_NOT_FOUND = "Пользователь с таким адресом не найден",
  PASSWORD_RESET_ERROR = "Не удалось восстановить пароль",
  DEFAULT_ERROR = "Ошибка операции восстановления пароля",
}

export const resetPassword = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(ResetPasswordStrings.RESET_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || ResetPasswordStrings.USER_NOT_FOUND);
    }

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(ResetPasswordStrings.PASSWORD_RESET_ERROR, error.message);
      throw new Error(error.message || ResetPasswordStrings.DEFAULT_ERROR);
    }
  }
};
