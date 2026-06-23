import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next();
    try {
        const decodedUserId = verifyToken(token);
        const user = await findUserById(decodedUserId);
        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};
