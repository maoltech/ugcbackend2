const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');


const ConnectDb = require('./config/db');
const routes = require('./routes')
const { passportStrategySetup } = require('./config')
const { runMigrations } = require('./config');

const app = express();

dotenv.config()

runMigrations()


app.use(bodyParser.json());

// app.use(cookieSession({
//   name: "session",
//   keys: ['cookie-keys'],
//   maxAge: 24 * 60 * 60 * 100
// }))

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if your app uses HTTPS
    maxAge: 24 * 60 * 60 * 1000 // session duration in milliseconds
  }
}));

app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000/',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true 
}));

// Passport.js 
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());
passportStrategySetup(passport)


// app.use(function (req, res, next) {
//   console.log({session: req.session});
//   console.log({cookies: req.cookies});
//   next();
// });


app.use('/api', routes)


// instantiate Connected Db
ConnectDb.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const port = process.env.PORT || 4000

// Listen to port
try {

  app.listen(port, () => {
    console.log(`server listening on ${port}`)
  })
} catch (error) {
  console.error({ message: error });
}





