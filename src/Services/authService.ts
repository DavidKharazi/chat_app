interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const formData = new FormData();
    //  formData.append("username", credentials.password);
    //  formData.append("password", credentials.email);
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);
    // const response = await fetch("https://chatnsv.up.railway.app/login", {
    const response = await fetch("https://chata100.up.railway.app/login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка авторизации");
    }

    const data = await response.json();
    console.log("Авторизация успешна:", data);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка авторизации:", error.message);
      throw new Error(error.message || "Ошибка авторизации");
    }
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const formData = new FormData();
    //  formData.append("username", credentials.password);
    //  formData.append("password", credentials.email);
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);
    //const response = await fetch("https://chatnsv.up.railway.app/register/", {
    const response = await fetch("https://chata100.up.railway.app/register/", {
      method: "POST",

      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ошибка регистрации:", errorData);
      throw new Error(errorData.message || "Ошибка регистрации");
    }

    const data = await response.json();
    console.log("Регистрация прошла успешно:", data);
    return data;
  } catch (error: any) {
    console.error("Ошибка регистрации:", error.message);
    throw new Error(error.message || "Ошибка регистрации");
  }
};
