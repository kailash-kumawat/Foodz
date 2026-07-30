import React from "react";
import { Outlet } from "react-router-dom";
import AuthPage from "../features/auth/AuthPage";

function AuthLayout() {
  return <AuthPage />;
}

export default AuthLayout;
