import { useForm } from "@mantine/form";
import { register } from "../../Services/authService";
import { CustomInput } from "./CustomInput";
import { RegisterFormValues } from "../../Types/FormTypes";
import { validateRegisterForm } from "../../utils/formValidations";
import CustomFormButton from "./CustomFormButton";
import { useState } from "react";
import { CustomPasswordInput } from "./CustomPasswordInput";

interface RegistrationFormProps {
  onSuccess: () => void;
  setErrorMessage: (message: string | null) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  setErrorMessage,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnChange: true,
    validate: validateRegisterForm,
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await register({
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      onSuccess();
      setErrorMessage(null);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error("Ошибка регистрации:", error.message);

        setErrorMessage(error.message);
      }
    }
  };
  const clearError = () => setErrorMessage(null);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <CustomInput
        description="Адрес электронной почты"
        placeholder="your.email@example.com"
        required
        form={form}
        errors={!!form.errors["email"]}
        field="email"
        type="email"
        clearError={clearError}
      />
      <CustomPasswordInput
        description="Пароль"
        placeholder="Введите пароль"
        required
        form={form}
        errors={!!form.errors["password"]}
        field="password"
        type="password"
        clearError={clearError}
      />
      <CustomPasswordInput
        description="Подтверждение пароля"
        placeholder="Повторите пароль"
        required
        form={form}
        errors={!!form.errors["password"]}
        field="confirmPassword"
        type="password"
        clearError={clearError}
      />
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
