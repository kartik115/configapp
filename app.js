var express = require('express');
var bodyParser = require('body-parser');
var app = express();

require('./DbConf/mysql2Conf');

var config = require('./secrets');

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Loading API routes
var routes = require('./routes');

app.use('/api', routes);

app.listen(3000,  function(){
  console.log("server is running on port 3000");
});