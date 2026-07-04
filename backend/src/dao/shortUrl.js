import shortUrlSchema from "../models/Shorturl.model.js";

export const saveShortUrl = async (
    longUrl,
    shortCode = null,
    userId = null,
    expiresAt = null,
) => {
    const newShortUrl = new shortUrlSchema({
        fullUrl: longUrl,
        shortUrl: shortCode,
    });
    if (expiresAt) {
        newShortUrl.expiresAt = expiresAt;
    }

    if (userId) {
        newShortUrl.user = userId;
    }
    await newShortUrl.save();
};

export const getUrlData = async (shortCode) => {
    const urlData = await shortUrlSchema.findOneAndUpdate(
        { shortUrl: shortCode },
        { $inc: { clicks: 1 } },
    );
    if (!urlData) {
        return null;
    }
    return urlData;
};

export const getCustomUrlData = async (customCode) => {
    const urlData = await shortUrlSchema.findOne({ shortUrl: customCode });
    return urlData || null;
};

export const getUrl = async (shortCode) => {
    const urlData = await shortUrlSchema.findOne({ shortUrl: shortCode });
    return urlData || null;
};
