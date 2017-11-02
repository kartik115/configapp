var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: String, 
  age: Number, 
  email: String
});

module.exports.customers = mongoose.model('customers', customerSchema);