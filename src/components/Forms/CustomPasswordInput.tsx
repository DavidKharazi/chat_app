import { PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormValues } from "../../Types/FormTypes";
import IconEye from "../../assets/IconEye.svg";
import IconEyeOff from "../../assets/IconEyeOff.svg";
import { ErrorMessage } from "./ErrorMessage";

interface InputProps<T extends BaseFormValues> {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  form: UseFormReturnType<T, (values: T) => Partial<T>>;
  field: keyof T;
  errors: boolean;
  type?: string;
  clearError: () => void;
}

export const CustomPasswordInput = <T extends BaseFormValues>({
  label,
  placeholder,
  description,
  required,
  form,
  field,
  errors,
  type = "password",
  clearError,
}: InputProps<T>) => {
  const inputProps = form.getInputProps(field);

  const [visible, { toggle }] = useDisclosure(false);

  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      description={description}
      w={310}
      size="md"
      required={required}
      type={type}
      {...inputProps}
      error={errors && <ErrorMessage error={form.errors[field]} />}
      onFocus={(event) => {
        clearError();
        inputProps.onFocus?.(event);
      }}
      onChange={(event) => {
        clearError();
        inputProps.onChange?.(event);
      }}
      visible={visible}
      onVisibilityChange={toggle}
      radius="7px"
      visibilityToggleIcon={({ reveal }) =>
        reveal ? (
          <img src={IconEyeOff} alt="Hide password" className="password-icon" />
        ) : (
          <img src={IconEye} alt="Show password" className="password-icon" />
        )
      }
    />
  );
};
