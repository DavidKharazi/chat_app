export const resetPassword = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    //  const response = await fetch(
    //   "https://chatnsv.up.railway.app/reset-password-request",
    const response = await fetch(
      "  https://chata100.up.railway.app/reset-password-request",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Пользователь с таким адресом не найден"
      );
    }

    const data = await response.json();
    console.log("Пароль восстановлен");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Не удалось восстановить пароль:", error.message);
      throw new Error(error.message || "Ошибка операции восстановления пароля");
    }
  }
};
