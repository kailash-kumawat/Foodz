import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./features/auth/AuthPage";
import { SingleDish } from "./components/index.js";
import Cart from "./features/cart/Cart";
import Checkout from "./features/checkout/Checkout";
import Profile from "./features/profile/Profile";
import Start from "./features/start/Start";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/dish/:id" element={<SingleDish />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
