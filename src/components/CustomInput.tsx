import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormValues } from "../utils/FormTypes";

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
}

export const CustomInput = <T extends BaseFormValues>({
  label,
  placeholder,
  required,
  form,
  field,
  type = "text",
  errors,
}: InputProps<T>) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      size="md"
      required={required}
      type={type}
      {...form.getInputProps(field)}
      error={<div className="input-password">{form.errors[field]}</div>}
      classNames={{
        input: "indent-0",
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
