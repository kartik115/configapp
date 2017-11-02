var config = require('../secrets');

// Setting the configuration
var mongoConfig = config.mongodb;

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

module.exports.collection = mongoose.model('customers', customerSchema);