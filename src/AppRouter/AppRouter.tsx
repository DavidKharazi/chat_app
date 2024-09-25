import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mantine/core";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ChatPage } from "../Pages/ChatPage";
import { ForgotPasswordPage } from "../Pages/ForgotPasswordPage";

const AppRouter: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      </Routes>
    </Box>
  );
};

export default AppRouter;
