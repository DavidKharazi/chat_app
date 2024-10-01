import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const registerPath = "/register";
const resetPasswordPath = "/reset-password";

export const LoginPageLinks = React.memo(() => {
  const navigate = useNavigate();

  const handleNavigateToRegister = useCallback(() => {
    navigate(registerPath);
  }, [navigate]);

  const handleNavigateToResetPassword = useCallback(() => {
    navigate(resetPasswordPath);
  }, [navigate]);

  return (
    <>
      <Text className="text-info" mt="md">
        Нет аккаунта?{" "}
        <Text
          component="span"
          className="text-link"
          onClick={handleNavigateToRegister}
        >
          Зарегистрируйтесь
        </Text>
      </Text>
      <Text className="text-info">
        Забыли пароль?{" "}
        <Text
          component="span"
          className="text-link"
          onClick={handleNavigateToResetPassword}
        >
          Сбросить пароль
        </Text>
      </Text>
    </>
  );
});
