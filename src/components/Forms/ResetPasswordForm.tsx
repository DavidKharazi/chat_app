import { useForm } from "@mantine/form";
import { resetPassword } from "../../Services/resetPassword";
import { CustomInput } from "./CustomInput";
import { BaseFormValues } from "../../Types/FormTypes";
import CustomFormButton from "./CustomFormButton";
import { useState } from "react";
import { validateResetPasswordForm } from "../../utils/formValidations";
import { FormConstants } from "../../utils/formConstants";
import { FormTip } from "./FormTip";

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
        description="Адрес электронной почты"
        placeholder="your.email@example.com"
        required
        form={form}
        errors={!!form.errors["email"]}
        field="email"
        type="email"
        clearError={clearError}
      />
      <FormTip text={FormConstants.RESET_PASSWORD_SUBTITLE_DEFAULT} />

      <CustomFormButton
        type="submit"
        isValid={form.isValid()}
        loading={loading}
      >
        {FormConstants.RESET_BUTTON_TEXT}
      </CustomFormButton>
    </form>
  );
};
