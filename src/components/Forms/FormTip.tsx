import { Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface FormTipProps {
  text: string;
}
export function FormTip({ text }: FormTipProps) {
  return (
    <div className="form-icon-wrapper">
      <IconAlertCircle size={18} className="form-icon" />
      <Text size="12px" className="tip">
        {text}
      </Text>
    </div>
  );
}
