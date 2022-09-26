import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";

import "./App.css";

import { Login } from "./components/pages/LoginPage";
import { Register } from "./components/pages/RegisterPage";
import { Landing } from "./components/pages/LandingPage";
import { Dashboard } from "./components/pages/DashboardPage";
import { Board } from "./components/pages/BoardPage";
import { getBoards } from "./api/boards";
import PublicRoutes from "./components/routes/PublicRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";

const contextClass = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function App() {
    const {
        data: boardsData,
        error: boardsError,
        isLoading: boardsIsLoading,
        isError: boardsIsError,
    } = useQuery("boards", getBoards);

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
            />

            <Routes>
                <Route path="/" element={<Landing />}></Route>

                <Route element={<PrivateRoutes />}>
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                data={boardsData}
                                error={boardsError}
                                isLoading={boardsIsLoading}
                                isError={boardsIsError}
                            />
                        }
                    ></Route>
                    <Route path="/board/:id" element={<Board />}></Route>
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
