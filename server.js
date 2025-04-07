const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();

const { fetchData } = require("./public/assets/js/lib/functions.js");

require("dotenv").config();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com/",
          "https://media.rawg.io/",
        ],
        connectSrc: [
          "'self'",
          "https://api.unsplash.com/",
          "https://api.rawg.io/",
        ],
      },
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

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
    console.log(gameData);
    res.render("pages/masonry", { games: gameData });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { games: [] });
  }
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// INFO: envoie messages
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, message, subject } = req.body;
  const htmlContent = `<h1> Nouveau message de contact </h1>
                       <p><strong> Sujet: </strong> ${req.body.subject}</p>
                       <p><strong> Nom: </strong> ${req.body.name}</p>
                       <p><strong> Email: </strong> ${req.body.email}</p>
                       <p><strong> Message: </strong> ${req.body.message}</p>
                       `;
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // port 465
      auth: {
        user: testAccount.user, // contact@monsite.com
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false, // authorise tout
      },
    });
    let mailOption = {
      from: `"Contact my crypto" <no-reply@monsite.com>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOption);
    // récupération de l'URL de la boite de messagerie local
    console.log("Message envoyé : %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(200).json({
      message: "Votre message a été envoyé avec succès",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erruer lors de l'envoie du mail",
    });
  }
});
