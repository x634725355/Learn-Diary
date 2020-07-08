var mysql = require('mysql');

const mysqlConfig = {
  host: 'localhost:3306',
  user: 'momo',
  password: '123456',
  database: 'my_db'
};

var connection = mysql.createConnection(mysqlConfig);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error

  console.log('The solution is: ', rows[0].solution);
});

connection.end();