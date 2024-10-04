import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ChatPage } from "../Pages/ChatPage";
import { ResetPasswordPage } from "../Pages/ResetPasswordPage";

export const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
];
