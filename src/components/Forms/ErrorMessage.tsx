import { IconAlertCircle } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ErrorMessageProps {
  error: ReactNode | ReactNode[];
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="error-icon-wrapper">
      <IconAlertCircle size={20} className="error-icon" />
      {error}
    </div>
  );
}
