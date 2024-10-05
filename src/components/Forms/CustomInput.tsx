import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormValues } from "../../Types/FormTypes";
import { IconAlertCircle } from "@tabler/icons-react";

interface InputProps<T extends BaseFormValues> {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  form: UseFormReturnType<T, (values: T) => Partial<T>>;
  errors: boolean;
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
  errors,
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
      error={
        errors && (
          <div style={{ display: "flex", alignItems: "center", color: "red" }}>
            <IconAlertCircle size={20} style={{ marginRight: 5 }} />
            {form.errors[field]}
          </div>
        )
      }
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
