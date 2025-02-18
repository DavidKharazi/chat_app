import { Box } from "@mantine/core";
import { useCallback, useState } from "react";
import { RegistrationForm } from "../components/Forms/RegistrationForm";
import { FormHeader } from "../components/Forms/FormHeader";
import { FormConstants } from "../utils/formConstants";
import { FormLogo } from "../components/Forms/FormLogo";
import { FormPageLinks } from "../components/Forms/FormPageLinks";
import { FormFooter } from "../components/Forms/FormFooter";
import { TermsPrivacyLinks } from "../components/Forms/TermsPrivacyLinks";

export function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderTitle = isRegistered
    ? FormConstants.REGISTER_TITLE_PENDING
    : FormConstants.REGISTER_TITLE;

  const formHeaderSubtitle = !isRegistered && !errorMessage ? "" : errorMessage;

  const handleSuccess = useCallback(() => {
    setIsRegistered(true);
  }, []);

  return (
    <Box className="container">
      <FormLogo />
      <FormHeader
        title={formHeaderTitle}
        subtitle={formHeaderSubtitle}
        isError={Boolean(errorMessage)}
      />

      {isRegistered ? null : (
        <RegistrationForm
          onSuccess={handleSuccess}
          setErrorMessage={setErrorMessage}
        />
      )}
      <FormPageLinks registerText={FormConstants.REGISTER_TEXT} />
      <Box className="privacy-links">
        <TermsPrivacyLinks />
        <FormFooter />
      </Box>
    </Box>
  );
}

