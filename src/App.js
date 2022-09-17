import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import { Login } from "./components/LoginPage";
import { Register } from "./components/RegisterPage";
import { Landing } from "./components/LandingPage";
import { Main } from "./components/MainPage";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

// add commit

function App() {
    return (
        <div className="App">
            <ToastContainer
                toastClassName={({ type }) =>
                    contextClass[type || "default"] +
                    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                }
                bodyClassName={() =>
                    "flex text-sm font-white font-med block p-3"
                }
                progressClassName="progress-bar"
            />

            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/main" element={<Main />} />

                <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
