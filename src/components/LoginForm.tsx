import { useForm } from "@mantine/form";
import { login } from "../Services/authService";
import { CustomInput } from "./CustomInput";
import { LoginFormValues } from "../utils/FormTypes";
import { validateLoginForm } from "../utils/formValidations";
import CustomFormButton from "./CustomFormButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginFormProps {
  setErrorMessage: (message: string | null) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setErrorMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: validateLoginForm,
  });
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await login(values);
      setLoading(false);
      setErrorMessage(null);
      navigate("/chat");
    } catch (error: any) {
      if (error instanceof Error) {
        setLoading(false);
        console.error("Ошибка авторизации:", error.message);
        setErrorMessage(error.message);
      }
    }
  };
  const clearError = () => setErrorMessage(null);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <CustomInput
        label="Email"
        placeholder="your.email@example.com"
        required
        form={form}
        errors={form.errors}
        field="email"
        type="email"
        clearError={clearError}
      />

      <CustomInput
        label="Пароль"
        placeholder="Введите пароль"
        required
        form={form}
        errors={form.errors}
        field="password"
        type="password"
        clearError={clearError}
      />
      <CustomFormButton
        type="submit"
        isValid={form.isValid()}
        loading={loading}
      >
        Войти
      </CustomFormButton>
    </form>
  );
};
