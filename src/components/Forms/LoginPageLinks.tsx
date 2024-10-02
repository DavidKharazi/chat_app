import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const registerPath = "/register";

export const LoginPageLinks = React.memo(() => {
  const navigate = useNavigate();

  const handleNavigateToRegister = useCallback(() => {
    navigate(registerPath);
  }, [navigate]);

  return (
    <>
      <Text className="text-info" mt="md">
        У вас нет учетной записи?{" "}
        <Text
          component="p"
          className="text-link"
          onClick={handleNavigateToRegister}
        >
          Зарегистрироваться
        </Text>
      </Text>
    </>
  );
});
