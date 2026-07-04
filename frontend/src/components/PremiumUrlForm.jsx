import React from "react";
import UrlForm from "./UrlForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PremiumUrlForm() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const user = useSelector((state) => state.auth.user?.user);

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.15),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_36%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.72),rgba(248,250,252,0.9))]" />

                <div className="relative z-10 mx-auto max-w-7xl p-4 sm:p-6 lg:p-10 xl:p-12">
                    {isAuthenticated && (
                        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 sm:px-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
                                    Premium Workspace
                                </p>
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    Welcome, {user.name || "User"}
                                </h1>
                            </div>
                            <span className="w-fit rounded-full border border-emerald-300/70 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-700">
                                Logged in
                            </span>
                        </div>
                    )}

                    <div
                        className={`${
                            isAuthenticated ? "grid" : ""
                        } gap-6 xl:gap-7 lg:grid-cols-3 justify-center items-center`}
                    >
                        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-7 lg:p-8 shadow-[0_12px_40px_rgba(30,41,59,0.12)] backdrop-blur-xl ">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900">
                                    Create branded short links with style
                                </h2>
                                <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
                                    Transform long URLs into elegant, memorable
                                    links for campaigns, profiles, and premium
                                    sharing.
                                </p>
                            </div>

                            <UrlForm />
                        </div>
                        {isAuthenticated && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
                                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 sm:p-6 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 mb-2">
                                        Performance
                                    </p>
                                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                                        24.8K
                                    </p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        clicks this month
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 sm:p-6 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                                    <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 mb-2">
                                        Conversion Boost
                                    </p>
                                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                                        +32%
                                    </p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        with clean branded links
                                    </p>
                                </div>

                                <div className="sm:col-span-2 lg:col-span-1 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 p-5 shadow-[0_8px_24px_rgba(79,70,229,0.12)]">
                                    <p className="text-sm text-indigo-700">
                                        🔗 Your links, elevated. Built for
                                        creators, teams, and modern brands.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PremiumUrlForm;
