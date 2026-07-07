import React, { useEffect, useState } from "react";
import {
    Link2,
    MousePointerClick,
    BarChart3,
    Globe,
    Plus,
    Copy,
    ExternalLink,
    Sparkles,
    LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { logoutUser } from "../api/user.api";
import { getShortUrls } from "../api/shortUrl";

function Dashboard() {
    const user = useSelector((state) => state.auth.user) || null;
    const Navigate = useNavigate();
    const [urls, seturls] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    useEffect(() => {
        const fetchUserUrls = async () => {
            try {
                const urls = await getShortUrls();
                console.log("Fetched user URLs:", urls);
                seturls(urls);
            } catch (error) {
                console.error("Error fetching user URLs:", error);
            }
        };
        fetchUserUrls();
    }, []);

    const stats = [
        { title: "Total Links", value: urls.length.toString(), icon: Link2 },
        {
            title: "Total Clicks",
            value: urls.reduce((acc, url) => acc + url.clicks, 0).toString(),
            icon: MousePointerClick,
        },
    ];
    const links = urls;

    const handleExternalLinkClick = (shortUrl) => {
        Navigate({ to: `/url/${shortUrl}` });
    }
    const handleCopy = (shortUrl) => {
        navigator.clipboard.writeText(backendUrl +"/" + shortUrl);
    }



    const handleLogout = async () => {
        const shouldLogout = window.confirm("Do you want to logout?");
        if (!shouldLogout) return;
        await logoutUser();
        window.location.href = "/home";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                    <div>
                        <p className="text-sm text-indigo-600 font-medium">
                            Premium Dashboard
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Welcome back, {user?.name || "User"}!
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Track performance, manage links, and optimize
                            campaigns.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                return Navigate({ to: "/" });
                            }}
                            className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white px-5 py-3 font-medium shadow-lg hover:opacity-90 transition"
                        >
                            <Plus size={18} />
                            New Link
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-3xl bg-white border border-slate-200 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
                        >
                            <div className="flex items-center justify-between">
                                <stat.icon className="w-5 h-5 text-slate-500" />
                                <span className="text-emerald-500 text-sm font-medium">
                                    {stat.growth}
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold mt-4">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                {stat.title}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Links Table */}
                        <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.06)] overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Your Links
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Manage and track all your URLs
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {links.map((link, index) => (
                                    <div
                                        key={index}
                                        className="p-5 hover:bg-slate-50 transition"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-indigo-600">
                                                        {link.shortUrl}
                                                    </p>
                                                    <Copy
                                                        onClick={() => {handleCopy(link.shortUrl)}}
                                                        size={16}
                                                        className="cursor-pointer text-slate-400"
                                                    />
                                                </div>
                                                <p className="text-sm text-slate-500 truncate max-w-md">
                                                    {link.fullUrl}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className="text-sm text-slate-400">
                                                        Clicks
                                                    </p>
                                                    <p className="font-semibold">
                                                        {link.clicks}
                                                    </p>
                                                </div>

                                                
                                                <ExternalLink
                                                    onClick={() => handleExternalLinkClick(link.shortUrl)}
                                                    size={18}
                                                    className="text-slate-400 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        {/* Premium Features */}

                       
                        <div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-red text-slate-700 px-5 py-3 font-medium border border-slate-200 shadow-sm hover:bg-slate-50 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
