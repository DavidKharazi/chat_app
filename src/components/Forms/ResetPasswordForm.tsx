import { useForm } from "@mantine/form";
import { resetPassword } from "../../Services/resetPassword";
import { CustomInput } from "./CustomInput";
import { BaseFormValues } from "../../Types/FormTypes";
import CustomFormButton from "./CustomFormButton";
import { useState } from "react";
import { validateResetPasswordForm } from "../../utils/formValidations";
import { FormConstants } from "../../utils/formConstants";

interface ResetPasswordFormProps {
  onSuccess: (message: string) => void;
  setErrorMessage: (message: string | null) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccess,
  setErrorMessage,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<BaseFormValues>({
    initialValues: {
      email: "",
    },
    validateInputOnChange: true,
    validate: validateResetPasswordForm,
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await resetPassword(values.email);
      setLoading(false);
      onSuccess(FormConstants.RESET_PASSWORD_SUCCESS_MESSAGE);
      setErrorMessage(null);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error("Не удалось восстановить пароль:", error.message);
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
      <CustomFormButton
        type="submit"
        isValid={form.isValid()}
        loading={loading}
      >
        Отправить инструкции
      </CustomFormButton>
    </form>
  );
};
