var config = require('./secrets');

// Setting the configuration
var mysqlConfig = config.mysql;
var mongoConfig = config.mongodb;

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


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoConnStr = 'mongodb://'+mongoConfig.db_host+":"+mongoConfig.db_port+"/"+mongoConfig.db_name;
mongoose = mongoose.connect(mongoConnStr);
//mongoose = mongoose.connect('mongodb://127.0.0.1:27017/customerapp');

//Test mongo connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var customerSchema = new Schema({
  name: String, 
  age: Number, 
  email: String
});


module.exports.sequelize = sequelize;
module.exports.collection = mongoose.model('customers', customerSchema);
