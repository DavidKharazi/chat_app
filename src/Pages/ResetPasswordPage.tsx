import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { ResetPasswordForm } from "../components/Forms/ResetPasswordForm";

import { FormHeader } from "../components/Forms/FormHeader";
import { FormConstants } from "../utils/formConstants";
import { FormLogo } from "../components/Forms/FormLogo";
import { FormPageLinks } from "../components/Forms/FormPageLinks";
import { FormFooter } from "../components/Forms/FormFooter";
import { TermsPrivacyLinks } from "../components/Forms/TermsPrivacyLinks";

export function ResetPasswordPage() {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderSubtitle = errorMessage || "";

  return (
    <Box className="container">
      <FormLogo />
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
            isReset={true}
          />
          <ResetPasswordForm
            onSuccess={setConfirmationMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
      <FormPageLinks resetText=" " />
      <Box className="privacy-links">
        <TermsPrivacyLinks />
        <FormFooter />
      </Box>
    </Box>
  );
}
