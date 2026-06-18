import express from "express"


const router = express.Router()
import {generateShortUrl} from "../controller/shortUrl.controller.js"


router.post("/", generateShortUrl)


export default router