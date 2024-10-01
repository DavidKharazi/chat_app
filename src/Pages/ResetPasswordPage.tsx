import { Box, Text, Image } from "@mantine/core";
import { useState } from "react";
import { ResetPasswordForm } from "../components/Forms/ResetPasswordForm";
import { RegisterPageLinks } from "../components/Forms/RegisterPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";
import logo_a100 from "../assets/a100_logo.png";
import { FormConstants } from "../utils/formConstants";

export function ResetPasswordPage() {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderSubtitle =
    errorMessage || FormConstants.RESET_PASSWORD_SUBTITLE_DEFAULT;

  return (
    <Box className="container">
      <Image className="form-logo" w={108} src={logo_a100} alt="A100 Logo" />
      {confirmationMessage ? (
        <Box className="subcontainer">
          <Text className="title">{confirmationMessage}</Text>
        </Box>
      ) : (
        <>
          <FormHeader
            title={FormConstants.RESET_PASSWORD_TITLE}
            subtitle={formHeaderSubtitle}
            isError={Boolean(errorMessage)}
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
