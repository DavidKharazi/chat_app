import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterPageLinksProps {
  loginText?: string;
  resetText?: string | null;
}

export const RegisterPageLinks: React.FC<RegisterPageLinksProps> = React.memo(
  ({ loginText, resetText }) => {
    const navigate = useNavigate();

    const loginPath = "/login";

    const handleNavigateToLogin = useCallback(() => {
      navigate(loginPath);
    }, [navigate]);

    return (
      <Text className="text-info" mt="md">
        {loginText && (
          <>
            {loginText}{" "}
            <Text
              component="span"
              className="text-link"
              onClick={handleNavigateToLogin}
            >
              Войти
            </Text>
          </>
        )}
        {resetText && (
          <>
            {resetText}{" "}
            <Text
              component="span"
              className="text-link"
              onClick={handleNavigateToLogin}
            >
              Вернуться на страницу входа
            </Text>
          </>
        )}
      </Text>
    );
  }
);
