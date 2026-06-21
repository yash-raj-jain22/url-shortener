import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shorturl from './src/routes/shortUrl.route.js';
import { redirectShortUrl } from './src/controller/shortUrl.controller.js';
import errorHandler from './src/utils/errorHandler.js';
import cors from 'cors';



const app = express();
app.use(cors())

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/create", shorturl)

app.get("/:shorty", redirectShortUrl)


app.use(errorHandler)


app.listen(5000, () => {
  connectDB()
  console.log("server is running on port http://localhost:5000")
})

