import { Box, Image } from "@mantine/core";
import { useCallback, useState } from "react";
import { RegistrationForm } from "../components/Forms/RegistrationForm";
import { RegisterPageLinks } from "../components/Forms/RegisterPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";
import logo_a100 from "../assets/a100_logo.png";
import { FormConstants } from "../utils/formConstants";

export function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formHeaderTitle = isRegistered
    ? FormConstants.REGISTER_TITLE_PENDING
    : FormConstants.REGISTER_TITLE;

  const formHeaderSubtitle =
    !isRegistered && !errorMessage
      ? FormConstants.REGISTER_SUBTITLE_DEFAULT
      : errorMessage;

  const handleSuccess = useCallback(() => {
    setIsRegistered(true);
  }, []);

  return (
    <Box className="container">
      <Image className="form-logo" w={108} src={logo_a100} alt="A100 Logo" />
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
      <RegisterPageLinks loginText={FormConstants.REGISTER_LINK_TEXT} />
    </Box>
  );
}
