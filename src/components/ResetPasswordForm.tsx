import { useForm } from "@mantine/form";
import { resetPassword } from "../Services/resetPassword";
import { CustomInput } from "./CustomInput";
import { BaseFormValues } from "../utils/FormTypes";
import CustomFormButton from "./CustomFormButton";

interface ResetPasswordFormProps {
  onSuccess: (message: string) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccess,
}) => {
  const form = useForm<BaseFormValues>({
    initialValues: {
      email: "",
    },
    validateInputOnChange: true,
    validate: {
      email: (value) => (/\S+@\S+/.test(value) ? null : "Некорректный email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await resetPassword(values.email);
      onSuccess(
        "Ссылка для сброса пароля отправлена на ваш email. Проверьте так же папку 'Спам'"
      );
    } catch (error: any) {
      console.error("Не удалось восстановить пароль:", error.message);
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
      <CustomFormButton type="submit" isValid={form.isValid()}>
        Отправить инструкции
      </CustomFormButton>
    </form>
  );
};
