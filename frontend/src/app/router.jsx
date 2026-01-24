import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../features/auth/Login";

function router() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default router;
