import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormValues } from "../../Types/FormTypes";

interface InputProps<T extends BaseFormValues> {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  form: UseFormReturnType<T, (values: T) => Partial<T>>;
  field: keyof T;
  type?: string;
  clearError: () => void;
}

export const CustomInput = <T extends BaseFormValues>({
  label,
  placeholder,
  description,
  required,
  form,
  field,
  type = "text",
  clearError,
}: InputProps<T>) => {
  const inputProps = form.getInputProps(field);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      description={description}
      size="md"
      w={310}
      required={required}
      type={type}
      {...inputProps}
      error={form.errors[field]}
      onFocus={(event) => {
        clearError();
        inputProps.onFocus?.(event);
      }}
      onChange={(event) => {
        clearError();
        inputProps.onChange?.(event);
      }}
      className="form-input"
      radius="7px"
    />
  );
};
