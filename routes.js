var express = require('express');
var app = express();
// Used for error handling....DB queries should not be here
const Sequelize = require('sequelize');

const sqlModels = require('./Models/mysqlModels');
const noSqlModels = require('./Models/nosqlModels');

var Customer = sqlModels.customer;
const User = noSqlModels.customers;

// const Customer = sequelize.define('customer', {
// 	id: {
// 		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
// 	},
// 	name: {
// 		type: Sequelize.STRING, allowNull: false
// 	},
// 	email: {
// 		type: Sequelize.STRING, allowNull: false
// 	},
// 	createdAt: {type: Sequelize.DATE, field: 'created_at'},
// 	updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
// }, {
// 	freezeTableName: true,
// 	timestamps: true
// });

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