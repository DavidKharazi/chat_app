import { useForm } from "@mantine/form";
import { Text } from "@mantine/core";
import { login } from "../../Services/authService";
import { CustomInput } from "./CustomInput";
import { LoginFormValues } from "../../Types/FormTypes";
import { validateLoginForm } from "../../utils/formValidations";
import CustomFormButton from "./CustomFormButton";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { CustomPasswordInput } from "./CustomPasswordInput";

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

  const chatPath = "/chat";

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await login(values);
      setLoading(false);
      setErrorMessage(null);
      navigate(chatPath);
    } catch (error: any) {
      if (error instanceof Error) {
        setLoading(false);
        console.error("Ошибка авторизации:", error.message);
        setErrorMessage(error.message);
      }
    }
  };
  const clearError = () => setErrorMessage(null);

  const resetPasswordPath = "/reset-password";

  const handleNavigateToResetPassword = useCallback(() => {
    navigate(resetPasswordPath);
  }, [navigate]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <CustomInput
        description="Адрес электронной почты"
        placeholder="Email*"
        required
        form={form}
        field="email"
        type="email"
        clearError={clearError}
      />

      <CustomPasswordInput
        description="Пароль"
        placeholder="Password*"
        required
        form={form}
        errors={form.errors}
        field="password"
        type="password"
        clearError={clearError}
      />
      <Text
        component="span"
        className="text-link"
        onClick={handleNavigateToResetPassword}
      >
        Забыли пароль?
      </Text>

      <CustomFormButton
        type="submit"
        isValid={form.isValid()}
        loading={loading}
      >
        Продолжить
      </CustomFormButton>
    </form>
  );
};
