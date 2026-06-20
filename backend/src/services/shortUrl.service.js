import { generateNanoId } from "../utils/helper.js"
import shortUrlSchema from "../models/Shorturl.model.js"
import { saveShortUrl } from "../dao/shortUrl.js"


export const createShortUrlWithoutUser = async (url) => {
    const shorty = generateNanoId(7)
    if (!shorty){
        throw new Error("Failed to generate short URL")
    }
    await saveShortUrl(url, shorty)
    return shorty
}


export const createShortUrlWithUser = async (url, userId) => {
    const shorty = generateNanoId(7)
    await saveShortUrl(url, shorty, userId)
    return shorty
}
