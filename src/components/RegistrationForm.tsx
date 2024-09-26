import { useForm } from "@mantine/form";
import { register } from "../Services/authService";
import { CustomInput } from "./CustomInput";
import { RegisterFormValues } from "../utils/FormTypes";
import { validateRegisterForm } from "../utils/formValidations";
import CustomFormButton from "./CustomFormButton";

interface RegistrationFormProps {
  onSuccess: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
}) => {
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
      await register({
        email: values.email,
        password: values.password,
      });

      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка регистрации:", error.message);
      }
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
      <CustomInput
        label="Подтверждение пароля"
        placeholder="Повторите пароль"
        required
        form={form}
        errors={form.errors}
        field="confirmPassword"
        type="password"
      />
      <CustomFormButton type="submit" isValid={form.isValid()}>
        Зарегистрироваться
      </CustomFormButton>
    </form>
  );
};
