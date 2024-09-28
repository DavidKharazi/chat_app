import { Box, Text } from "@mantine/core";

interface HeaderProps {
  title: string;
  subtitle?: string | null;
  isError?: boolean;  
}
export function FormHeader({ title, subtitle, isError }: HeaderProps) {
  return (
    <Box className="wrapper">
      <Text className="form-title">{title}</Text>
      {subtitle && (
        <Text size="14px" className={isError ? "error-message" : "subtitle"}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
