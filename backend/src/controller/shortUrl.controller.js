import { createShortUrlWithoutUser } from "../services/shortUrl.service.js"
import { getUrlData } from "../dao/shortUrl.js"

export const generateShortUrl = async (req, res) => {
    const { url } = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.send(process.env.APP_URL + "/" + shortUrl)
}


export const redirectShortUrl = async (req, res) => {
    const { shorty: shortUrl } = req.params
    console.log(shortUrl)
    const urlData = await getUrlData(shortUrl)
    if (!urlData || !urlData.fullUrl) { return res.status(404).send('Not found') }
    return res.redirect(`http://${urlData.fullUrl}`)
}