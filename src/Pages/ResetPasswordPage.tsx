import { Button, TextInput, Box, Text } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../Services/resetPassword";
import { useHover } from "@mantine/hooks";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const { hovered: buttonHovered, ref: buttonRef } =
    useHover<HTMLButtonElement>();
  const { hovered: spanHovered, ref: spanRef } = useHover<HTMLSpanElement>();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validateInputOnChange: true,
    validate: {
      email: (value) => (/\S+@\S+/.test(value) ? null : "Некорректный email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await resetPassword(values.email);
      setConfirmationMessage(
        "Ссылка для сброса пароля отправлена на ваш email. Проверьте так же папку 'Спам'"
      );
    } catch (error: any) {
      console.error("Не удалось восстановить пароль:", error.message);
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
      {confirmationMessage ? (
        <Box style={{ textAlign: "center" }}>
          <Text
            style={{ fontFamily: "GeistSans", fontSize: "24px", margin: "0px" }}
          >
            {confirmationMessage}
          </Text>
        </Box>
      ) : (
        <>
          <Box style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div
              style={{
                fontFamily: "GeistSans",
                fontSize: "24px",
                margin: "0px",
              }}
            >
              Введите электронный адрес
              <p
                style={{
                  fontFamily: "GeistSans",
                  fontSize: "14px",
                  color: "grey",
                  margin: "0px",
                }}
              >
                Укажите email для восстановления пароля
              </p>
            </div>
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
              error={
                <div
                  style={{
                    maxWidth: "350px",
                    wordWrap: "break-word",
                    minHeight: "20px",
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
            <Button
              type="submit"
              fullWidth
              variant="filled"
              disabled={!form.isValid()}
              mt="md"
              color={buttonHovered ? "#869bb1" : "#18181a"}
              ref={buttonRef}
            >
              Отправить инструкции
            </Button>
          </form>
        </>
      )}
      <Text style={{ textAlign: "center", marginTop: "1rem" }}>
        <Text
          component="span"
          ref={spanRef}
          style={{
            cursor: "pointer",
            textDecoration: spanHovered ? "underline" : "none",
          }}
          onClick={() => navigate("/login")}
        >
          Вернуться на страницу входа
        </Text>
      </Text>
    </Box>
  );
}
