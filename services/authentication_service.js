const execute_query = require('../services/database_service').execute_query
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var salt = 7;
var secret_key = process.env.SECRET_KEY;

const hash_service = require('./hash_service');
const responses = require('../common_functions/responses');
const constants = require('../constants/constants');



const register_passenger = async (req, res) => {
    try {
        var hash = await hash_service.hash_password(req.body.password);
        var sql_query = 'insert into passengers values(?, ?, ?, ?, ?)'
        var values = [req.body.passengerID, req.body.passengerName, req.body.emailID, req.body.mobileNumber, hash]
        var result = await execute_query(sql_query, values)
    }
    catch (error) {
        res.json(error)
    }
}





const login_passenger = async (req, res) => {

    try {
        var sql_query = 'select * from passengers where emailID=?'
        var values = [req.body.emailID]
        var rows = await execute_query(sql_query, values)


        if (rows.length === 0) {
            return responses.sendAuthResponse(res, "Wrong Credentials", constants.STATUS_CODES.UNAUTHORIZED);
        }
        else {
            var result = await hash_service.compare_password(req.body.password, rows[0].password);
            if (result) {
                const token = jwt.sign({
                    emailID: req.body.emailID,
                    passengerID: rows[0].passengerID
                },
                    secret_key);

                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token,
                    emailID: req.body.emailID,
                    passengerID: rows[0].passengerID
                });
            }
            else {
                return responses.sendAuthResponse(res, "Invalid password", constants.STATUS_CODES.UNAUTHORIZED);
            }

        }
    }
    catch (error) {
        res.json({
            message: "Some error"
        })
    }
}


const logout_passenger = (req, res) => {
    res.status(200).json({
        message: "logged out"
    })
}

module.exports = { login_passenger, logout_passenger, register_passenger }