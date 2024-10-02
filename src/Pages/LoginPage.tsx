import { Box } from "@mantine/core";
import { LoginForm } from "../components/Forms/LoginForm";
import { FormHeader } from "../components/Forms/FormHeader";
import { useState } from "react";
import { FormConstants } from "../utils/formConstants";
import { FormLogo } from "../components/Forms/FormLogo";
import { FormPageLinks } from "../components/Forms/FormPageLinks";

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderSubtitle = errorMessage || FormConstants.LOGIN_SUBTITLE;

  return (
    <Box className="container">
      <FormLogo />
      <FormHeader
        title={FormConstants.LOGIN_TITLE}
        subtitle={formHeaderSubtitle}
        isError={Boolean(errorMessage)}
      />
      <LoginForm setErrorMessage={setErrorMessage} />
      <FormPageLinks loginText={FormConstants.LOGIN_TEXT} />
    </Box>
  );
}
