import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { login, logout } from "./store/slice/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const hydrateAuth = async () => {
            try {
                const response = await getCurrentUser();
                if (response?.user) {
                    dispatch(login(response.user));
                } else {
                    dispatch(logout());
                }
            } catch {
                dispatch(logout());
            }
        };

        hydrateAuth();
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
