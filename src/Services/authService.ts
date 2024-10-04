interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

enum AuthMessages {
  AuthorizationFailed = "Ошибка авторизации",
  RegistrationFailed = "Ошибка регистрации",
  UnknownError = "Произошла неизвестная ошибка",
}

export const BASE_URL = "https://chata100.up.railway.app"; //https://chatnsv.up.railway.app
const LOGIN_URL = `${BASE_URL}/login`;
const REGISTER_URL = `${BASE_URL}/register`; ///register/

export const login = async (credentials: LoginCredentials) => {
  try {
    const formData = new FormData();
    //  formData.append("username", credentials.password); // костыль для  https://nsvcyberman.up.railway.app/
    //  formData.append("password", credentials.email);
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || AuthMessages.AuthorizationFailed);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(AuthMessages.AuthorizationFailed, error.message);
      throw new Error(error.message || AuthMessages.AuthorizationFailed);
    } else {
      console.error(AuthMessages.UnknownError);
      throw new Error(AuthMessages.UnknownError);
    }
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const formData = new FormData();
    //  formData.append("username", credentials.password); // костыль для  https://nsvcyberman.up.railway.app/
    //  formData.append("password", credentials.email);
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(REGISTER_URL, {
      method: "POST",

      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(AuthMessages.RegistrationFailed, errorData);
      throw new Error(errorData.message || AuthMessages.RegistrationFailed);
    }

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(AuthMessages.RegistrationFailed, error.message);
      throw new Error(error.message || AuthMessages.RegistrationFailed);
    } else {
      console.error(AuthMessages.UnknownError);
      throw new Error(AuthMessages.UnknownError);
    }
  }
};
