import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";


export const register_user = async ({ name, email, password }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    const user = await createUser({ name, email, password });
    const token = await signToken({ id: user._id });
    return { token, user };
};
export const login_user = async ({ email, password }) => {
    const user = await findUserByEmail(email,true);
    const isPasswordValid = await user?.comparePassword(password);
    if (!user || !isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const token = await signToken({ id: user._id });
    const safeUser = user.toObject();
    return { token, user: safeUser };
};
