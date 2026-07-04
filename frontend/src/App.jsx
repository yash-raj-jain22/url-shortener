import React from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import RegisterForm from "./components/RegisterForm";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
