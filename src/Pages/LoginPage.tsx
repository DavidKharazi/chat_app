import { Button, TextInput, Box, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const { hovered: spanHovered, ref: spanRef } = useHover<HTMLSpanElement>();
  const { hovered: spanTextHovered, ref: spanTextRef } =
    useHover<HTMLSpanElement>();
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
          Вход
        </div>
        <p style={{ fontFamily: "GeistSans", color: "grey", margin: "0px" }}>
          Войдите в свой аккаунт
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
        <Button
          type="submit"
          fullWidth
          mt="md"
          color={hovered ? "#869bb1" : "#18181a"}
          ref={ref}
        >
          Войти
        </Button>
      </form>
      <Text style={{ textAlign: "center" }} mt="md">
        Нет аккаунта?{" "}
        <Text
          component="span"
          ref={spanRef}
          style={{
            cursor: "pointer",
            textDecoration: spanHovered ? "underline" : "none",
          }}
          onClick={() => navigate("/register")}
        >
          Зарегистрируйтесь
        </Text>
      </Text>
      <Text style={{ textAlign: "center" }}>
        Забыли пароль?{" "}
        <Text
          component="span"
          ref={spanTextRef}
          style={{
            cursor: "pointer",
            textDecoration: spanTextHovered ? "underline" : "none",
          }}
          onClick={() => navigate("/reset-password")}
        >
          Сбросить пароль
        </Text>
      </Text>
    </Box>
  );
}
