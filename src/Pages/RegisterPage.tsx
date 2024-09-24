import { Button, TextInput, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/\S+@\S+/.test(value) ? null : "Некорректный email"),
      password: (value) =>
        value.length > 5 ? null : "Пароль должен содержать не менее 6 символов",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Пароли не совпадают",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Заменить на отправку запроса на регистрацию
    console.log("Регистрация:", values);
    navigate("/chat");
  };

  return (
    <Box style={{ minWidth: 350, maxWidth: 650, margin: "auto" }}>
      <h3>Регистрация</h3>
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
        <TextInput
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          required
          type="password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" fullWidth mt="md">
          Зарегистрироваться
        </Button>
      </form>
      <Text style={{ textAlign: "center" }} mt="md">
        Уже зарегистрированы?{" "}
        <Text
          component="span"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Войти
        </Text>
      </Text>
    </Box>
  );
}
