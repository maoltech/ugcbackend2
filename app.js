const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const ConnectDb = require("./config/db");
const routes = require("./routes");
const { passportStrategySetup } = require("./config");
const { runMigrations } = require("./config");

const app = express();

dotenv.config();

// runMigrations()

app.use(bodyParser.json());

// app.use(cookieSession({
//   name: "session",
//   keys: ['cookie-keys'],
//   maxAge: 24 * 60 * 60 * 100
// }))
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://frontend2--ugcreator.netlify.app",
      "https://6401c4d41bec43006d81aa04--gorgeous-licorice-f8928c.netlify.app",
    ],
  })
);

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cookieParser());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Passport.js
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());
passportStrategySetup(passport);

// app.use(function (req, res, next) {
//   console.log({session: req.session});
//   console.log({cookies: req.cookies});
//   next();
// });

app.use("/api", routes);

// instantiate Connected Db
ConnectDb.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = process.env.PORT || 4000;

// Listen to port
try {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
} catch (error) {
  console.error({ message: error });
}
