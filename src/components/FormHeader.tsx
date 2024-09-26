import { Box, Text } from "@mantine/core";

interface HeaderProps {
  title: string;
  subtitle?: string | null;
}

export function FormHeader({ title, subtitle }: HeaderProps) {
  return (
    <Box className="header">
      <Text className="form-title">{title}</Text>
      {subtitle && <Text className="subtitle">{subtitle}</Text>}
    </Box>
  );
}
