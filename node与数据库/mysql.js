var mysql = require('mysql');

var connection = mysql.createConnection(mysqlConfig);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  
});