export const AUTH_MESSAGES = {
  EMAIL_ALREADY_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  LOGOUT_SUCCESS: "Logout successful",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  INVALID_TOKEN:"Invalid token"
} as const;

export const USER_MESSAGES = {
  USER_NOT_FOUND: "User not found",
} as const;
export const GENERAL_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
} as const;