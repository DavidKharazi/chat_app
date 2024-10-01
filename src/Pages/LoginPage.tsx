import { Box, Image } from "@mantine/core";
import { LoginForm } from "../components/Forms/LoginForm";
import { LoginPageLinks } from "../components/Forms/LoginPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";
import { useState } from "react";
import logo_a100 from "../assets/a100_logo.png";
import { FormConstants } from "../utils/formConstants";

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderSubtitle = errorMessage || FormConstants.LOGIN_SUBTITLE;

  return (
    <Box className="container">
      <Image className="form-logo" w={88} src={logo_a100} alt="A100 Logo" />
      <FormHeader
        title={FormConstants.LOGIN_TITLE}
        subtitle={formHeaderSubtitle}
        isError={Boolean(errorMessage)}
      />
      <LoginForm setErrorMessage={setErrorMessage} />
      <LoginPageLinks />
    </Box>
  );
}
