var express = require('express');
var app = express();

const conn = require('./DbConf/mysql2Conf');

// Used for error handling....DB queries should not be here
const Sequelize = require('sequelize');

const sqlModels = require('./Models/mysqlModels');
const noSqlModels = require('./Models/nosqlModels');

var Customer = sqlModels.customer;
const User = noSqlModels.customers;


app.post('/register', function(req, res){
	var tableName = req.body.table_name;
	var fields = req.body.fields;
	var sqlScript = '';
	fields.forEach(function(field) {
		sqlScript += field['name'] +" "+ field['type'] +" ";
		if (field['is_primary']) sqlScript += "PRIMARY KEY" + " ";
		if (field['is_unique']) sqlScript += "UNIQUE KEY" + " ";
		if (field['is_null']) {
			sqlScript += "NULL" + " ";
		} else {
			sqlScript += "NOT NULL" + " ";
		}
		sqlScript += ",";
	});
	sqlScript = sqlScript.slice(0, -1);
	console.log(sqlScript);
	var sql = "CREATE TABLE " +tableName + " (" + sqlScript + ")";
	console.log(sql);
	conn.connect();
	conn.query(sql, function(err, result){
		if (err) {
			res.json({'msg': err});
		}
		else {
			console.log("Table created!");
			res.json({'msg': tableName + " created successfully !!"});
		}
	});
});


//Customer.build({'name': 'Kartikeya', 'email': 'kartikeyamishra2@gmail.com'}).save(); 

app.get('/sql/getData', function(req, res){
	//Customer.build({'customer_name': 'Kartikeya', 'mail_id': 'kartikeyamishra2@gmail.com'}).save();
	queryParams = req.query;
	if (JSON.stringify(queryParams) === '{}'){
		Customer.findAll().then(customers => {
			res.json({'users': customers});
		}).catch(function (err) {
  			res.status(500).send(err);
  			console.log(err);
		});
	} else{
		Customer.findAll({ where: { customer_name: queryParams.username }}).then(customers => {
			res.json({'users': customers});
		}).catch(function (err) {
  			res.status(500).send(err);
  			console.log(err);
		});
	}
});


app.get('/sql/getData', function(req, res){
	//Customer.build({'customer_name': 'Kartikeya', 'mail_id': 'kartikeyamishra2@gmail.com'}).save();
	queryParams = req.query;
	if (JSON.stringify(queryParams) === '{}'){
		Customer.findAll().then(customers => {
			res.json({'users': customers});
		}).catch(function (err) {
  			res.status(500).send(err);
  			console.log(err);
		});
	} else{
		Customer.findAll({ where: { customer_name: queryParams.username }}).then(customers => {
			res.json({'users': customers});
		}).catch(function (err) {
  			res.status(500).send(err);
  			console.log(err);
		});
	}
});


// var data = new User({
// 		name: "Kartikeya",
// 		age: 18,
// 		email: "kartikeyamishra2@gmail.com"
// 	});
// 	data.save(function(err){
// 		if (err) throw err;
// 		console.log("person saved successfully");
// });

app.get('/mongo/getData', function(req, res){
	queryParams = req.query;
	if (JSON.stringify(queryParams) === '{}'){
		User.find().then(users => {
			res.json({'users': users});
		});
	} else {
		User.find({ name: queryParams.username}).then(users => {
			res.json({'users': users});
		});
	}
});

// module.exports = (function(){
// 	return app;
// })();


function init(){
	return app;
}

module.exports = init();