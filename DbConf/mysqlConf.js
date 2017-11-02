var config = require('../secrets');

// Setting the configuration
var mysqlConfig = config.mysql;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(mysqlConfig.db_name, mysqlConfig.db_username, mysqlConfig.db_password, {
  host: mysqlConfig.db_host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequalize: Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports.sequelize = sequelize;
