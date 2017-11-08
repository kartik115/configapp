var config = require('../secrets');

// Setting the configuration
var mysqlConfig = config.mysql;

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : mysqlConfig.db_host,
  user     : mysqlConfig.db_username,
  password : mysqlConfig.db_password,
  database : mysqlConfig.db_name
});

var Tables = mysqlConfig.db_table;

console.log(Object.keys(Tables));
console.log(Object.keys(Tables["customer"]));


connection.connect();

for (table in Tables) {
	var tableObject = Tables[table];
	console.log(Tables[table]["id"]["type"]);
	validateTables(table, tableObject);
}

function validateTables(table, tableObject){
	console.log(table);

	connection.query('DESCRIBE '+table, function (error, results, fields) {
 		if (error) {
 			//throw error;
 			console.log(table + " is having some problem");
 		}
 		else {
			results.forEach(function(res) {
				var fieldName = res.Field;
				var fieldType = res.Type;
				var isNull = res.Null;
				var isPrimary = res.Key;
				var defaultValue = res.Default;
				//console.log(tableObject[fieldName] + table + fieldName);
				var obj = tableObject[fieldName];
				if (obj == undefined){
					console.log("Be careful !! column: " + fieldName + " not exist in your config file for table: "+table);
				}
				else if (obj['type'] == fieldType) {
					return 1;
				}
				else return 0;
			});
		}
  	});
}

module.exports = connection;