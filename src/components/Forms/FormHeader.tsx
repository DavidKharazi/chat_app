import { Box, Text } from "@mantine/core";

interface HeaderProps {
  title: string;
  subtitle?: string | null;
  isError?: boolean;
  isReset?: boolean;
}
export function FormHeader({ title, subtitle, isError, isReset }: HeaderProps) {
  return (
    <Box className="wrapper">
      <Text className={`form-title ${isReset ? "form-reset-title" : ""}`}>
        {title}
      </Text>
      {subtitle && (
        <Text size="14px" className={isError ? "error-message" : "subtitle"}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
