import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const user = useSelector((state) => state.auth?.user?.user || null);

    const navLinks = [
        { name: "Home", path: "/" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-10">
                {/* Desktop */}
                <div className="hidden w-full md:grid md:grid-cols-3 md:items-center">
                    {/* Left */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold tracking-tight text-[#10182D]"
                        >
                            SnapURL
                        </Link>
                    </div>

                    {/* Middle */}
                    <div className="flex items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="group relative text-sm font-medium text-[#10182D]"
                            >
                                {link.name}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#10182D] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center justify-end gap-3">
                        {!isAuthenticated ? (
                            <Link
                                to="/auth"
                                className="rounded-xl bg-[#10182D] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Authenticate
                            </Link>
                        ) : (
                            <>
                                <span className="text-sm font-medium text-[#10182D]/80">
                                    Welcome, {user?.name || "User"}
                                </span>

                                <Link
                                    to="/dashboard"
                                    className="rounded-xl bg-[#10182D] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex w-full items-center justify-between md:hidden">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight text-[#10182D]"
                    >
                        SnapURL
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#10182D]"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${
                    isOpen ? "max-h-[500px] border-t" : "max-h-0"
                }`}
            >
                <div className="space-y-4 bg-white px-6 py-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm font-medium text-[#10182D]"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="pt-4">
                        {!user ? (
                            <Link
                                to="/auth"
                                className="block rounded-xl bg-[#10182D] px-4 py-2 text-center text-sm font-medium text-white"
                            >
                                Login / Register
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-[#10182D]/80">
                                    Welcome, {user.name}
                                </p>

                                <Link
                                    to="/dashboard"
                                    className="rounded-xl bg-[#10182D] px-4 py-2 text-center text-sm font-medium text-white"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
