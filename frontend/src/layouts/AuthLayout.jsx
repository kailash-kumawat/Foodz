import React from "react";
import { Outlet } from "react-router-dom";
import AuthPage from "../features/auth/AuthPage";

function AuthLayout() {
  return (
    <AuthPage />
    // <div className="min-h-screen flex items-center justify-center bg-white">
    // </div>
  );
}

export default AuthLayout;
