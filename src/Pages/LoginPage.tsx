import { Box } from "@mantine/core";
import { LoginForm } from "../components/Forms/LoginForm";
import { LoginPageLinks } from "../components/Forms/LoginPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";
import { useState } from "react";

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <Box className="container">
      <FormHeader
        title="Вход"
        subtitle={errorMessage ? errorMessage : "Войдите в свой аккаунт"}
        isError={!!errorMessage}
      />
      <LoginForm setErrorMessage={setErrorMessage} />
      <LoginPageLinks />
    </Box>
  );
}
