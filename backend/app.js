import express from 'express';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './src/config/mongo.config.js';
import shorturl from './src/routes/shortUrl.route.js';
import { redirectShortUrl } from './src/controller/shortUrl.controller.js';
import errorHandler from './src/utils/errorHandler.js';


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/create", shorturl)

app.get("/:shorty", redirectShortUrl)


app.use(errorHandler)


app.listen(5000, () => {
  connectDB()
  console.log("server is running on port http://localhost:5000")
})

