var express = require('express');
var app = express();

var config = require('./config');
var mysql = require('mysql2');

var routes = require('./routes');

// Setting the configuration
var mysqlConfig = config.mysql;
var mongoConfig = config.mongodb;


//Settings with mysql connector
var con = mysql.createConnection({
  host: mysqlConfig.db_host,
  user: mysqlConfig.db_username,
  password: mysqlConfig.db_password,
  database: mysqlConfig.db_name
});

// Test mysql connections
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.end(function(err) {
  // The connection is terminated now
});


// Settings with mysql string connection
var str = 'mysql://'+mysqlConfig.db_username+':@'+mysqlConfig.db_host+':'+mysqlConfig.db_port+'/'+mysqlConfig.db_name;
console.log(str);
var connection = mysql.createConnection('mysql://'+mysqlConfig.db_username+':@'+mysqlConfig.db_host+':'+mysqlConfig.db_port+'/'+mysqlConfig.db_name);

// Test mysql connections
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected with basic syntax!");
});

connection.end(function(err) {
  // The connection is terminated now
});


// Settings with mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mongoConnStr = 'mongodb://'+mongoConfig.db_host+':'+mongoConfig.port+'/'+mongoConfig.db_name;
//mongoose = mongoose.connect('mongodb://127.0.0.1:27017/mydb');
mongoose = mongoose.connect(mongoConnStr);

//Test mongo connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

app.use('/api', routes);

app.listen(3000,  function(){
  console.log("server is running on port 3000");
});