import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ChatPage } from "../Pages/ChatPage";
import { ResetPasswordPage } from "../Pages/ResetPasswordPage";
import { PrivacyPolicy } from "../Pages/PrivacyPolicyPage";
import { TermsOfUse } from "../Pages/TermsOfUse";

export const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "privacy-policy", element: <PrivacyPolicy /> },
  { path: "terms-of-use", element: <TermsOfUse /> },
];
