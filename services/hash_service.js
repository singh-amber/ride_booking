const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var salt = 7;
var secret_key = process.env.SECRET_KEY;


const hash_password = (user_password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user_password, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash)
            }
        });
    })
}

const compare_password = (user_password, password_in_database) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(user_password, password_in_database, (err, result) => {
            if (result) {
                resolve(true);
            }
            else if (!result) {
                resolve(false);
            }
            else {
                reject(err)
            }
        })
    })
}

module.exports = { hash_password, compare_password }
