import { ReactNode } from "react";

interface ErrorMessageProps {
  error: ReactNode;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <div className="input-password">{error}</div>;
};
