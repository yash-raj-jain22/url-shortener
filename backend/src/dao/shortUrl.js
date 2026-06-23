import shortUrlSchema from "../models/Shorturl.model.js"

export const saveShortUrl = (async (longUrl, shortCode, userId) => {

    const newShortUrl = new shortUrlSchema({
        fullUrl: longUrl,
        shortUrl: shortCode
    })

    if (userId) {
        newShortUrl.user = userId
    }
    await newShortUrl.save()
});


export const getUrlData = async (shortCode) => {
    const urlData = await shortUrlSchema.findOneAndUpdate({ shortUrl: shortCode }, { $inc: { clicks: 1 } })
    if (!urlData) {
        return null
    }
    return urlData
}

export const getCustomUrlData = async (customCode) => {
    const urlData = await shortUrlSchema.findOne({ shortUrl: customCode })
    return urlData || null
}