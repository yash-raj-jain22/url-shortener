// App.jsx or your main component
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { loginUser, registerUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: "/dashboard" });
        }
    }, [isAuthenticated]);

    const handleLogin = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(formData.email, formData.password);
            dispatch(login(data.user));
            redirect({ to: "/dashboard" });
            console.log("Login successful!");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await registerUser(
                formData.firstName + " " + formData.lastName,
                formData.email,
                formData.password,
            );
            dispatch(login(data.user));
            redirect({ to: "/dashboard" });

            alert("Registration successful!");
            setShowRegister(false);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
            {showRegister ? (
                <RegisterForm
                    setShowRegister={setShowRegister}
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />
            ) : (
                <LoginForm
                    setShowRegister={setShowRegister}
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
            )}

            {/* Toggle button for demo */}
            <button
                onClick={() => {
                    setShowRegister(!showRegister);
                    setError(null);
                }}
                className="cursor-pointer fixed bottom-4 right-4 px-6 py-3 bg-white rounded-full shadow-lg text-sm font-medium text-slate-700 hover:shadow-xl  transition-shadow duration-300 hover:scale-105 active:scale-95"
            >
                {showRegister ? "Show Login" : "Show Register"}
            </button>
        </div>
    );
}
