export interface BaseFormValues {
  email: string;
}

export interface RegisterFormValues extends BaseFormValues {
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues extends BaseFormValues {
  password: string;
}
