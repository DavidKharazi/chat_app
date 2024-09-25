import { Button, TextInput, Box, Text } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/authService";
import { useHover } from "@mantine/hooks";

export function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const { hovered: spanHovered, ref: spanRef } = useHover<HTMLSpanElement>();

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
          : "Некорректный email",

      password: (value) =>
        passwordRegex.test(value) && !/\s/.test(value)
          ? null
          : `Не менее 8 символов, минимум 1 заглавная буква, 1 цифра, 1 спец. символ [)!@#$%^&*(),.?":{}|<>], пробелы запрещены`,

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
      setIsRegistered(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка регистрации:", error.message);
      }
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
          style={{
            fontFamily: "GeistSans",
            fontSize: "24px",
            margin: "0px",
            maxWidth: "380px",
            wordWrap: "break-word",
          }}
        >
          {isRegistered
            ? "Заявка отправлена на модерацию. Ожидайте ответа на ваш e-mail!"
            : "Регистрация"}
        </div>
        {!isRegistered && (
          <p style={{ fontFamily: "GeistSans", color: "grey", margin: "0px" }}>
            Введите данные для регистрации
          </p>
        )}
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
        <TextInput
          label="Подтверждение пароля"
          size="md"
          placeholder="Повторите пароль"
          required
          type="password"
          {...form.getInputProps("confirmPassword")}
          error={
            <div
              style={{
                maxWidth: "350px",
                wordWrap: "break-word",
                minHeight: "30px",
              }}
            >
              {form.errors.confirmPassword}
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
          variant="filled"
          disabled={!form.isValid()}
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
``;
