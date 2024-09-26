import { useForm } from "@mantine/form";
import { login } from "../Services/authService";
import { CustomInput } from "./CustomInput";
import { LoginFormValues } from "../utils/FormTypes";
import { validateLoginForm } from "../utils/formValidations";
import CustomFormButton from "./CustomFormButton";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: validateLoginForm,
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await login(values);
      onSuccess();
    } catch (error: any) {
      console.error("Ошибка авторизации:", error.message);
    }
  };

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
      />

      <CustomInput
        label="Пароль"
        placeholder="Введите пароль"
        required
        form={form}
        errors={form.errors}
        field="password"
        type="password"
      />
      <CustomFormButton type="submit" isValid={form.isValid()}>
        Войти
      </CustomFormButton>
    </form>
  );
};
