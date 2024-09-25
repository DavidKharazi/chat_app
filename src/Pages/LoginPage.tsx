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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnChange: true,
    validate: {
      email: (value) =>
        emailRegex.test(value) && !/\s/.test(value)
          ? null
          : "Некорректный email (должен содержать @, точку, латинские буквы, пробелы запрещены)",

      password: (value) =>
        passwordRegex.test(value) && !/\s/.test(value)
          ? null
          : 'Пароль должен содержать не менее 8 символов, минимум 1 заглавную букву, 1 цифру, 1 спец. символ из [!@#$%^&*(),.?":{}|<>], пробелы запрещены',
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
        minWidth: 380,
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
        }}
      >
        <TextInput
          label="Email"
          size="md"
          placeholder="your.email@example.com"
          required
          {...form.getInputProps("email")}
          error={
            <div
              style={{
                maxWidth: "350px",
                wordWrap: "break-word",
                minHeight: "30px",
                margin: 0,
              }}
            >
              {form.errors.email}
            </div>
          }
          styles={{
            input: {
              color: form.errors.email ? "red" : "black",
              borderColor: form.errors.email ? "red" : "black",
              transition: "border-color 0.2s ease",
            },
          }}
        />
        <TextInput
          label="Пароль"
          size="md"
          placeholder="Введите пароль"
          required
          type="password"
          {...form.getInputProps("password")}
          error={
            <div
              style={{
                maxWidth: "350px",
                wordWrap: "break-word",
                minHeight: "45px",
              }}
            >
              {form.errors.password}
            </div>
          }
          styles={{
            input: {
              color: form.errors.email ? "red" : "black",
              borderColor: form.errors.email ? "red" : "black",
              transition: "border-color 0.2s ease",
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="filled"
          disabled={!form.isValid()}
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
