import { Button, TextInput, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/authService";

export function LoginPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/\S+@\S+/.test(value) ? null : "Некорректный email"),
      password: (value) =>
        value.length > 5 ? null : "Пароль должен содержать не менее 6 символов",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await login(values);
      console.log("Авторизация успешна:", data);
      navigate("/chat");
    } catch (error: any) {
      console.error("Ошибка авторизации:", error.message);
    }
  };

  return (
    <Box style={{ minWidth: 350, maxWidth: 650, margin: "auto" }}>
      <h3>Авторизация</h3>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          required
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Пароль"
          placeholder="Введите пароль"
          required
          type="password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="md">
          Войти
        </Button>
      </form>
      <Text style={{ textAlign: "center" }} mt="md">
        Впервые здесь?{" "}
        <Text
          component="span"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться
        </Text>
      </Text>
      <Text style={{ textAlign: "center" }}>
        Забыли пароль?{" "}
        <Text
          component="span"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Сбросить пароль
        </Text>
      </Text>
    </Box>
  );
}
