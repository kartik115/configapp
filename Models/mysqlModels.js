var express = require('express');

const Sequelize = require('sequelize');
const sequelize = require('../DbConf/mysqlConf');

const dbTable = require('../secrets').mysql.db_table;
const customer = dbTable.customer;

const maps = {
	"int": Sequelize.INTEGER,
	"string": Sequelize.STRING,
	"date": Sequelize.DATE
}

const Customer = sequelize.define('customer', {
	id: {
		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
	},
	customer_name: {
		type: Sequelize.STRING, allowNull: false, field: "name"
	},
	mail_id: {
		type: Sequelize.STRING, allowNull: false, field: "email"
	},
	age: {
		type: Sequelize.INTEGER, allowNull: false
	},
	created_at: {type: Sequelize.DATE, field: 'created_at'},
	updated_at: {type: Sequelize.DATE, field: 'updated_at'},
	// createdAt: {type: Sequelize.DATE, field: 'created_at'},
	// updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
}, {
	freezeTableName: true,
	timestamps: false
});


module.exports.customer = Customer;