const mysql = require('mysql2');

require('dotenv').config();

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const conn = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    multipleStatements: true //when multiple queries are executed at the same time
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn