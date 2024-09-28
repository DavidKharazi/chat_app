import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormValues } from "../Types/FormTypes";

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface InputProps<T extends BaseFormValues> {
  label: string;
  placeholder?: string;
  required?: boolean;
  form: UseFormReturnType<T, (values: T) => Partial<T>>;
  field: keyof T;
  errors: FormErrors<T>;
  type?: string;
  clearError: () => void;
}

export const CustomInput = <T extends BaseFormValues>({
  label,
  placeholder,
  required,
  form,
  field,
  type = "text",
  errors,
  clearError,
}: InputProps<T>) => {
  const inputProps = form.getInputProps(field);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      size="md"
      required={required}
      type={type}
      {...inputProps}
      error={<div className="input-password">{form.errors[field]}</div>}
      classNames={{
        input: "indent-0",
      }}
      onFocus={(event) => {
        clearError();
        inputProps.onFocus?.(event);
      }}
      onChange={(event) => {
        clearError();
        inputProps.onChange?.(event);
      }}
      styles={{
        input: {
          color: errors[field] ? "red" : "black",
          borderColor: errors[field] ? "red" : "black",
          transition: "border-color 0.2s ease",
        },
      }}
    />
  );
};
