import { Button, TextInput, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/authService";
import { useHover } from "@mantine/hooks";

export function RegisterPage() {
  const navigate = useNavigate();
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const { hovered: spanHovered, ref: spanRef } = useHover<HTMLSpanElement>();
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

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await register({
        email: values.email,
        password: values.password,
      });
      console.log("Регистрация успешна:", data);
      navigate("/chat");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка регистрации:", error.message);
      }
    }
  };

  return (
    <Box
      style={{
        minWidth: 350,
        maxWidth: 650,
        margin: "auto",
        border: "1px solid #b1bfcc",
        borderRadius: "7px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div
          style={{ fontFamily: "GeistSans", fontSize: "24px", margin: "0px" }}
        >
          Регистрация
        </div>
        <p style={{ fontFamily: "GeistSans", color: "grey", margin: "0px" }}>
          Введите данные для регистрации
        </p>
      </Box>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
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
        <Button
          type="submit"
          fullWidth
          mt="md"
          color={hovered ? "#869bb1" : "#18181a"}
          ref={ref}
        >
          Зарегистрироваться
        </Button>
      </form>
      <Text style={{ textAlign: "center" }} mt="md">
        Уже зарегистрированы?{" "}
        <Text
          component="span"
          ref={spanRef}
          style={{
            cursor: "pointer",
            textDecoration: spanHovered ? "underline" : "none",
          }}
          onClick={() => navigate("/login")}
        >
          Войти
        </Text>
      </Text>
    </Box>
  );
}
