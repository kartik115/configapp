var mongoose = require('../DbConf/mongoConf');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: String, 
  age: Number, 
  email: String
});

module.exports.customers = mongoose.model('customers', customerSchema);