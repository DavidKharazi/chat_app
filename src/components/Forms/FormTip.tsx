import { Text } from "@mantine/core";
import IconAlertCircleGray from "../../assets/IconAlertCircleGray.svg";

interface FormTipProps {
  text: string;
}
export function FormTip({ text }: FormTipProps) {
  return (
    <div className="form-icon-wrapper">
      <img src={IconAlertCircleGray} alt="Alert" className="form-icon" />
      <Text size="12px" className="tip">
        {text}
      </Text>
    </div>
  );
}
