const mysql = require('mysql2');

const dbPool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'myweight'
});

module.exports= dbPool.promise();
