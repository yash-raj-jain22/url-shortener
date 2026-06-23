import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { loginUser } from "../api/user.api";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [loginState, setLoginState] = useState(false);

    const handleLogin = async (data) => {
        try {
            setLoading(true);

            await loginUser(data.email, data.password);

            console.log("Logged in");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        {loginState ? (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                    <LoginForm onSubmit={handleLogin} loading={loading} />
                </div>
            </div>
        ) : <RegisterForm />}
        </>
    );
}
