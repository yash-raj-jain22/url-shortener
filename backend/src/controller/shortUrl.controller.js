import { createShortUrlWithoutUser } from "../services/shortUrl.service.js"
import { getUrlData } from "../dao/shortUrl.js"
import errorWrapper from "../utils/errorWrapper.js"

export const generateShortUrl = errorWrapper(async (req, res) => {
    const { url } = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.status(200).json(process.env.APP_URL + "/" + shortUrl)
})


export const redirectShortUrl = errorWrapper(async (req, res) => {
    const { shorty: shortUrl } = req.params
    const urlData = await getUrlData(shortUrl)
    if (!urlData || !urlData.fullUrl) { return res.status(404).send('Not found') }
    return res.redirect(`${urlData.fullUrl}`)
});