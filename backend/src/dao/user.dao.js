import User from '../models/User.model.js';

export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

export const createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password });
    await user.save();
    return user;
}

export const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}