import {
    createShortUrlWithoutUser,
    createShortUrlWithUser,
    getShortUrlsByUser,
    deleteUrl,
} from "../services/shortUrl.service.js";
import { getUrl, getUrlData } from "../dao/shortUrl.js";
import errorWrapper from "../utils/errorWrapper.js";

export const generateShortUrl = errorWrapper(async (req, res) => {
    const data = req.body;
    let shortUrl;
    if (req.user) {
        shortUrl = await createShortUrlWithUser(
            data.url,
            req.user.id,
            data.customUrl,
        );
    } else {
        shortUrl = await createShortUrlWithoutUser(data.url);
    }
    res.status(200).json(process.env.APP_URL + "/" + shortUrl);
});

// export const generateCustomShortUrl = errorWrapper(async (req, res) => {
//     const { url, customUrl } = req.body;
//     const shortUrl = await createShortUrlWithUser(url, customUrl);
//     res.status(200).json(process.env.APP_URL + "/" + shortUrl);
// });

export const redirectShortUrl = errorWrapper(async (req, res) => {
    const { shorty: shortUrl } = req.params;
    const urlData = await getUrlData(shortUrl);
    if (!urlData || !urlData.fullUrl) {
        return res.status(404).send("Not found");
    }
    return res.redirect(`${urlData.fullUrl}`);
});

export const getShortUrls = errorWrapper(async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }
    const shortUrls = await getShortUrlsByUser(req.user.id);
    res.status(200).json(shortUrls);
});

export const getShortUrl = errorWrapper(async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }
    const { shortUrl } = req.params;
    const urlData = await getUrl(shortUrl);
    if (!urlData) {
        return res.status(404).send("Not found");
    }
    res.status(200).json(urlData);
});

export const deleteShortUrl = errorWrapper(async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }
    const { shortUrl } = req.params;
    const urlData = await getUrl(shortUrl);
    if (!urlData?.user) {
        return res.status(403).send("Forbidden");
    }
    if (urlData.user() !== req.user.id) {
        return res.status(403).send("Forbidden");
    }
    if (!urlData) {
        return res.status(404).send("Not found");
    }
    await deleteUrl(urlData._id);
    res.status(200).send("Link deleted successfully");
});
