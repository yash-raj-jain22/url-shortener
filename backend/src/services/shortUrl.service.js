import { generateNanoId } from "../utils/helper.js";
import shortUrlSchema from "../models/ShortUrl.model.js";
import { getCustomUrlData, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
    const shorty = generateNanoId(7);
    if (!shorty) {
        throw new Error("Failed to generate short URL");
    }
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    await saveShortUrl(url, shorty, null, expiresAt);
    return shorty;
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const existingUrl = await getCustomUrlData(slug);
    if (existingUrl) {
        throw new Error("Custom URL already exists");
    }
    const shorty = slug || generateNanoId(7);
    await saveShortUrl(url, shorty, userId, null);
    return shorty;
};

export const getShortUrlsByUser = async (userId) => {
    const shortUrls = await shortUrlSchema.find({ user: userId });
    return shortUrls;
};

export const deleteUrl = async (UrlId) => {
    const url = await shortUrlSchema.findByIdAndDelete(UrlId);
    if (!url) {
        throw new Error("URL not found");
    }
    return url;
};
