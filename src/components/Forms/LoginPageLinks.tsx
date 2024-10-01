import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const LoginPageLinks = () => {
  const navigate = useNavigate();

  const register = "/register";

  const resetPassword = "/reset-password";
  return (
    <>
      <Text className="text-info" mt="md">
        Нет аккаунта?{" "}
        <Text
          component="span"
          className="text-link"
          onClick={() => navigate(register)}
        >
          Зарегистрируйтесь
        </Text>
      </Text>
      <Text className="text-info">
        Забыли пароль?{" "}
        <Text
          component="span"
          className="text-link"
          onClick={() => navigate(resetPassword)}
        >
          Сбросить пароль
        </Text>
      </Text>
    </>
  );
};
