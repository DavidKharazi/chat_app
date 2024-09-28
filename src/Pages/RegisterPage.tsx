import { Box } from "@mantine/core";
import { useState } from "react";
import { RegistrationForm } from "../components/Forms/RegistrationForm";
import { RegisterPageLinks } from "../components/Forms/RegisterPageLinks";
import { FormHeader } from "../components/Forms/FormHeader";

export function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Box className="container">
      <FormHeader
        title={
          isRegistered
            ? "Заявка отправлена на модерацию. Ожидайте ответа на ваш e-mail!"
            : "Создать аккаунт"
        }
        subtitle={
          !isRegistered && !errorMessage
            ? "Введите данные для регистрации"
            : errorMessage
        }
        isError={!!errorMessage}
      />

      {isRegistered ? null : (
        <RegistrationForm
          onSuccess={() => setIsRegistered(true)}
          setErrorMessage={setErrorMessage}
        />
      )}
      <RegisterPageLinks loginText="Уже зарегистрированы?" />
    </Box>
  );
}
