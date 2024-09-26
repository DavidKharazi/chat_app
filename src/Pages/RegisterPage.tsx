import { Box } from "@mantine/core";
import { useState } from "react";
import { RegistrationForm } from "../components/RegistrationForm";
import { RegisterPageLinks } from "../components/RegisterPageLinks";
import { FormHeader } from "../components/FormHeader";

export function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Box className="container">
      <FormHeader
        title={
          isRegistered
            ? "Заявка отправлена на модерацию. Ожидайте ответа на ваш e-mail!"
            : "Регистрация"
        }
      />
      {!isRegistered && (
        <p className="subtitle">Введите данные для регистрации</p>
      )}
      {isRegistered ? null : (
        <RegistrationForm onSuccess={() => setIsRegistered(true)} />
      )}
      <RegisterPageLinks loginText="Уже зарегистрированы?" />
    </Box>
  );
}
