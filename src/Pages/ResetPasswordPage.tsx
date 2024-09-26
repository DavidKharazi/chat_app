import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { RegisterPageLinks } from "../components/RegisterPageLinks";
import { FormHeader } from "../components/FormHeader";

export function ResetPasswordPage() {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );

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
            subtitle="Укажите email для восстановления пароля"
          />
          <ResetPasswordForm onSuccess={setConfirmationMessage} />
        </>
      )}
      <RegisterPageLinks resetText=" " />
    </Box>
  );
}
