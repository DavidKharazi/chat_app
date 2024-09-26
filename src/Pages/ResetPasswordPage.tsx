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
            title="Войдите в свой аккаунт"
            subtitle="Введите электронный адрес"
          />
          <ResetPasswordForm onSuccess={setConfirmationMessage} />
        </>
      )}
      <RegisterPageLinks resetText="Вернуться на страницу" />
    </Box>
  );
}
