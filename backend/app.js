import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shorturl from './src/routes/shortUrl.route.js';

dotenv.config("./.env");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/create", shorturl)

app.get("/:shorty", async (req, res) => {
  const { shorty } = req.params
  const shortUrlDoc = await shortUrlSchema.findOne({ shortUrl: shorty })
  if (shortUrlDoc) {
    console.log(shortUrlDoc.fullUrl)
    return res.redirect(`http://${shortUrlDoc.fullUrl}`)
  }
  if (!shortUrlDoc) {
    return res.status(404).send("Short URL not found")
  }
})



app.listen(5000, () => {
  connectDB()
  console.log("server is running on port http://localhost:5000")
})


// Get route - Redirection

// Post route - Create Short URL