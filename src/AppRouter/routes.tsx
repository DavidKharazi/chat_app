import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ChatPage } from "../Pages/ChatPage";
import { ForgotPasswordPage } from "../Pages/ForgotPasswordPage";

export const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
];
