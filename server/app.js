const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv')

const ConnectDb = require('./config/db');
const routes = require('./routes')
const { passportStrategySetup } = require('./config')
const { runMigrations } = require('./config')

const app = express();

dotenv.config()

runMigrations()


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





