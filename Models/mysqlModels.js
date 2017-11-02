var express = require('express');

const Sequelize = require('sequelize');
const sequelize = require('../DbConf/mysqlConf').sequelize;

const Customer = sequelize.define('customer', {
	id: {
		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
	},
	name: {
		type: Sequelize.STRING, allowNull: false
	},
	email: {
		type: Sequelize.STRING, allowNull: false
	},
	createdAt: {type: Sequelize.DATE, field: 'created_at'},
	updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
}, {
	freezeTableName: true,
	timestamps: true
});


module.exports.customer = Customer;