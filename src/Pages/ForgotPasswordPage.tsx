import { Button, TextInput, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/\S+@\S+/.test(value) ? null : "Некорректный email"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Заменить на отправку запроса на сброс пароля
    console.log("Запрос на сброс пароля:", values);
    navigate("/login");
  };

  return (
    <Box style={{ minWidth: 350, maxWidth: 650, margin: "auto" }}>
      <h3>Введите электронный адрес</h3>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          required
          {...form.getInputProps("email")}
        />
        <Button type="submit" fullWidth mt="md">
          Сбросить пароль
        </Button>
      </form>
      <Text style={{ textAlign: "center", marginTop: "1rem" }}>
        <Text
          component="span"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Назад к авторизации
        </Text>
      </Text>
    </Box>
  );
}
