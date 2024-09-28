import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { ResetPasswordForm } from "../components/Forms/ResetPasswordForm";
import { RegisterPageLinks } from "../components/Forms/RegisterPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";

export function ResetPasswordPage() {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Box className="container">
      {confirmationMessage ? (
        <Box className="subcontainer">
          <Text className="title">{confirmationMessage}</Text>
        </Box>
      ) : (
        <>
          <FormHeader
            title="Восстановление пароля"
            subtitle={
              errorMessage
                ? errorMessage
                : "Укажите email для восстановления пароля"
            }
            isError={!!errorMessage}
          />
          <ResetPasswordForm
            onSuccess={setConfirmationMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
      <RegisterPageLinks resetText=" " />
    </Box>
  );
}
