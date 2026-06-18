import { createShortUrl } from "../services/shortUrl.service.js"


export const generateShortUrl = async (req, res) => {
    const { url } = req.body
    const shortUrl = await createShortUrl(url)
    res.send(process.env.APP_URL + "/" + shortUrl)
}
