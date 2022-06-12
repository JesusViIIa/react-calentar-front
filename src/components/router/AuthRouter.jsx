import React from "react";
import { LoginScreen } from "../auth/LoginScreen";
import { RegisterScreen } from "../auth/RegisterScreen";
import { Navigate, Routes, Route } from "react-router-dom";
export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
