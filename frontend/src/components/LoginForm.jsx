import React, { useState } from "react";

export default function LoginForm({ onSubmit, loading = false }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full h-12 px-4 pr-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 text-sm text-slate-400">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
            </label>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl font-semibold transition-all duration-200 ${
                    loading
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-linear-to-r from-blue-600 to-violet-600 text-white hover:scale-[1.02]"
                }`}
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}
