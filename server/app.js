const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const ConnectDb = require('./config/db');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use('/ugc', router )

const port = process.env.PORT || 6000

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





