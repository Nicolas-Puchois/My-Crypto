const express = require("express");
const path = require("path");
const app = express();
const { fetchData } = require("./public/assets/js/lib/functions.js");

require("dotenv").config();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

// app.get("/masonry", (req, res) => {
//   res.render("pages/masonry");
// });

const games = fetchData({
  api: "https://api.rawg.io/api",
  route: "/games",
  options: {
    params: {
      key: process.env.RAWGIO_APIKEY,
      dates: "2012-09-01,2015-09-30",
      plateforms: "18,1,7",
      genres: "actions,massively-multiplayer",
    },
  },
}).then((data) => {
  return data.results;
});

app.get("/masonry", async (req, res) => {
  try {
    const gameData = await games;
    // console.log(gameData);
    res.render("pages/masonry", { games: gameData });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { games: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
