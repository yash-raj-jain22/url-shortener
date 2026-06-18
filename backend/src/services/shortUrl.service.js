import { generateNanoId } from "../utils/helper.js"
import shortUrlSchema from "../models/Shorturl.model.js"


export const createShortUrl = (url) => {
    const shorty = generateNanoId(7)
    const shortUrl = new shortUrlSchema({
        fullUrl: url,
        shortUrl: shorty,
    })
    shortUrl.save()
    console.log(url, shorty)
    return shorty
}
