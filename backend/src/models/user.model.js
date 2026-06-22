import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: function () {
            return generateRandomAvatar(this.name);
        }
    },
});

function generateRandomAvatar(user_name) {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${user_name}`;
}

export default mongoose.model('User', userSchema);