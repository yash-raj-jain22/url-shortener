import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import shorturl from "./src/routes/shortUrl.route.js";
import { redirectShortUrl } from "./src/controller/shortUrl.controller.js";
import errorHandler from "./src/utils/errorHandler.js";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(
    cors({
        origin: process.env.APP_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(attachUser);

app.use("/api/url", shorturl);
app.use("/api/auth", authRoutes);
app.get("/:shorty", redirectShortUrl);

app.use(errorHandler);

app.listen(5000, () => {
    connectDB();
    console.log("server is running on port http://localhost:5000");
});
