import { Box } from "@mantine/core";
import { LoginForm } from "../components/LoginForm";
import { LoginPageLinks } from "../components/LoginPageLinks";
import { FormHeader } from "../components/FormHeader";
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
