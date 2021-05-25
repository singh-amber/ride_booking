const mysql_connections = require('../mysql_connection');

const execute_query = (sql_query, values) => {
    return new Promise((resolve, reject) => {
        mysql_connections.query(sql_query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = { execute_query }

// module.exports = { alias: execute_query }

// exports.alias = execute_query

// exports = { execute_query }