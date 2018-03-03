/* Requires */
const mysql = require('mysql');

class ConnectionFactory {

  static connection() {

    let connection = mysql.createConnection({
      host      : 'localhost',
      port      : 8889,
      user      : 'root',
      password  : 'root',
      database  : 'payfast'
    });

    return connection;

  }

}

module.exports = () => ConnectionFactory;

/* connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end(); */