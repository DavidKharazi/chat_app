import { Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { LoginPageLinks } from "../components/LoginPageLinks";
import { FormHeader } from "../components/FormHeader";

export function LoginPage() {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate("/chat");
  };

  return (
    <Box className="container">
      <FormHeader title="Вход" subtitle="Войдите в свой аккаунт" />
      <LoginForm onSuccess={handleLoginSuccess} />
      <LoginPageLinks />
    </Box>
  );
}
