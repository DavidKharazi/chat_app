export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
export const MIN_PASSWORD_LENGTH = 8;
export const UPPER_CASE_REGEX = /(?=.*[A-Z])/;
export const DIGIT_REGEX = /(?=.*\d)/;
export const SPECIAL_CHAR_REGEX = /(?=.*[!@#$%^&*(),.?":{}|<>])/;
export const VALID_CHARACTERS_REGEX = /^[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
