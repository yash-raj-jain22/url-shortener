import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/user.api";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            setError("Full name is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!validateForm()) return;

        try {
            setLoading(true);

            await registerUser(
                formData.fullName,
                formData.email,
                formData.password,
            );

            setSuccess("Account created successfully!");

            setFormData({
                fullName: "",
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Registration failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-8">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-3">🚀</div>

                        <h1 className="text-3xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="text-slate-400 mt-2 text-sm">
                            Start shortening and tracking your links
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                {success}
                            </div>
                        )}

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                    minLength={8}
                                    className="w-full h-12 px-4 pr-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>

                            <p className="text-xs text-slate-500 mt-2">
                                Password must be at least 8 characters long.
                            </p>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 text-sm text-slate-400">
                            <input
                                type="checkbox"
                                required
                                disabled={loading}
                                className="accent-blue-500 mt-1"
                            />

                            <span>
                                I agree to the{" "}
                                <span className="text-blue-400 cursor-pointer">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-blue-400 cursor-pointer">
                                    Privacy Policy
                                </span>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-12 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                                loading
                                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-blue-600 to-violet-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/20"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className="opacity-25"
                                        />

                                        <path
                                            fill="currentColor"
                                            className="opacity-75"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-slate-400 text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium transition"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
