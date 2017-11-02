var express = require('express');
var app = express();
var mysql = require('mysql2');

var config = require('./secrets');


//Loading API routes
var routes = require('./routes');

app.use('/api', routes);

app.listen(3000,  function(){
  console.log("server is running on port 3000");
});