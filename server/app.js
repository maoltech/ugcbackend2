const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv')

const ConnectDb = require('./config/db');
const routes = require('./routes')
const passportStrategySetup = require('./controllers/passport.auth')

dotenv.config()

const app = express();
const { runMigrations } = require('./config')

runMigrations()


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 6000

// Passport.js 
app.use(passport.initialize());
passportStrategySetup(passport)

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


// Listen to port
try {

  app.listen(port, () => {
    console.log(`server listening on ${port}`)
  })
} catch (error) {
  console.error({ message: error });
}





