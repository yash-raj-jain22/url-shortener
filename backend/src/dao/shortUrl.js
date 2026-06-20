import shortUrlSchema from "../models/Shorturl.model.js"

export const saveShortUrl = async (longUrl, shortCode, userId) => {
    const newShortUrl = new shortUrlSchema({
        fullUrl: longUrl,
        shortUrl: shortCode
    })

    if (userId) {
        newShortUrl.userId = userId
    }
    await newShortUrl.save()
};


export const getUrlData = async (shortCode) => {
    const urlData = await shortUrlSchema.findOneAndUpdate({ shortUrl: shortCode }, { $inc: { clicks: 1 } })
    if (!urlData) {
        return null
    }
    return urlData
}