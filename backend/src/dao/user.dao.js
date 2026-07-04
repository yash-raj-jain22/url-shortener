import User from "../models/user.model.js";

export const findUserByEmail = async (email, includePassword = false) => {
    let query = User.findOne({ email });
    if (includePassword) {
        query = query.select("+password");
    }
    const user = await query;
    return user;
}


export const createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password });
    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;
    return safeUser;
}

export const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}