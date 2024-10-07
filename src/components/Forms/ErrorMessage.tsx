import IconAlertCircle from "../../assets/IconAlertCircle.svg";
import { ReactNode } from "react";

interface ErrorMessageProps {
  error: ReactNode | ReactNode[];
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <span className="error-icon-wrapper">
      <img src={IconAlertCircle} alt="Alert" className="error-icon" />
      {error}
    </span>
  );
}
