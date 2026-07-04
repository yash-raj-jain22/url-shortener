import express from "express";

const router = express.Router();
import {
    generateShortUrl,
    getShortUrls,
    getShortUrl,
    deleteShortUrl,
} from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

router.post("/create/", generateShortUrl);
router.get("/get", authMiddleware, getShortUrls);
router.get("/get/:shortUrl", authMiddleware, getShortUrl);
router.delete("/delete/:shortUrl", authMiddleware, deleteShortUrl);

export default router;
