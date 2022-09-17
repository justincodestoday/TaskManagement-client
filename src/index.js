import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import "./index.css";
import "tw-elements";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <App />
        </Router>
    </QueryClientProvider>
);
