import { cookieOptions } from "../config/config.js";
import { login_user, register_user } from "../services/auth.service.js";
import errorWrapper from "../utils/errorWrapper.js";

export const registerUser = errorWrapper(async (req, res) => {
    // Add jwt register
    const { name, email, password } = req.body;
    const { token } = await register_user({ name, email, password });
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "User registered successfully" });
});

export const loginUser = errorWrapper(async (req, res) => {
    const { email, password } = req.body;
    const { token } = await login_user({ email, password });

    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "User logged in successfully" });
});
