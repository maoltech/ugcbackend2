const { runMigrations } = require('./runMigrations');
const { passportStrategySetup }  = require('./passport')


module.exports = { runMigrations, passportStrategySetup };