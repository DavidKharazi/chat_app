import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface RegisterPageLinksProps {
  loginText?: string;
  resetText?: string;
}

export const RegisterPageLinks: React.FC<RegisterPageLinksProps> = ({
  loginText,
  resetText,
}) => {
  const navigate = useNavigate();

  return (
    <Text className="text-info" mt="md">
      {loginText && (
        <>
          {loginText}{" "}
          <Text
            component="span"
            className="text-link"
            onClick={() => navigate("/login")}
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
            onClick={() => navigate("/reset-password")}
          >
            Сбросить пароль
          </Text>
        </>
      )}
    </Text>
  );
};
