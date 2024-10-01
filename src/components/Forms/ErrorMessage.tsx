import { ReactNode } from "react";

interface ErrorMessageProps {
  error: ReactNode | ReactNode[];
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  // if (!error) return null;

  return <span className="input-password">{error}</span>;
};
