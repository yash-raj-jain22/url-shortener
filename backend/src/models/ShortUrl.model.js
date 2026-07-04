import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

shortUrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
