require('dotenv').config();
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import express from "express";
import mongoose from "mongoose";
import Url from "./mongoModel";
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoUri = process.env.MONGO_URI as string;

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//MongoDb connection using mongoose
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('Root endpoint is working');
});

// Adding a Cron Job to keep the server awake.
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.send('OK');
});

//API to fetch Long URL and generate a short URL and store it in the DB.
app.post("/", async (req, res) => {
  const { longUrl } = req.body;

  try {
    let url = await Url.findOne({ longUrl }); //to find the input longUrl already exist

    if (url) {
      console.log("found");
      return res.json(url);
    } else {
      console.log("not found");
      const shortId = nanoid(7);
      const newLink = `https://zt-vkan.onrender.com/${shortId}`;
      console.log(longUrl);
      console.log(newLink);

      url = new Url({ longUrl, shortUrl: newLink });

      await url.save();
      return res.status(201).json({shortUrl: url.shortUrl});
    }
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({ error: "server-error" });
  }
});

//API for redirecting to original URL when short url is clicked.
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const getUrl = `https://zt-vkan.onrender.com/${shortId}`;
  console.log(getUrl);

  try {
    const url = await Url.findOne({ shortUrl: getUrl });

    if (url && url.longUrl) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "Short URL not found" });
    }
    
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

//live server on port 3000
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});