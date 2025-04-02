import { fetchData } from "./public/assets/js/lib/functions.js";
const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

const images = fetchData({
  route:
    "/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7",
}).then((data) => {
  return data.result;
});

app.get("/masonry", async (req, res) => {
  try {
    const imageData = await images;
    res.render("pages/masonry", { images: imageData });
    console.log(imageData);
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
