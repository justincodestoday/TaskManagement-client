import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import { Login } from "./components/pages/LoginPage";
import { Register } from "./components/pages/RegisterPage";
import { Landing } from "./components/pages/LandingPage";
import { Dashboard } from "./components/pages/DashboardPage";
import PublicRoutes from "./components/routes/PublicRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import UserRoutes from "./components/routes/UserRoutes";

const contextClass = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

function App() {
  return (
    <div className="App">
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "flex text-sm font-white font-med block p-3"}
      />

      <Routes>
        <Route path="/" element={<Landing />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
