import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shorturl from './src/routes/shortUrl.route.js';
import { redirectShortUrl } from './src/controller/shortUrl.controller.js';

dotenv.config("./.env");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/create", shorturl)

app.get("/:shorty", redirectShortUrl)



app.listen(5000, () => {
  connectDB()
  console.log("server is running on port http://localhost:5000")
})


// Get route - Redirection

// Post route - Create Short URL