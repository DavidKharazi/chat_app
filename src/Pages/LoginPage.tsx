import { Box, Image } from "@mantine/core";
import { LoginForm } from "../components/Forms/LoginForm";
import { LoginPageLinks } from "../components/Forms/LoginPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";
import { useState } from "react";
import logo_a100 from "../assets/a100_logo.png";

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <Box className="container">
      <Image className="form-logo" w={108} src={logo_a100} alt="A100 Logo" />
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
