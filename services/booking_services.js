const execute_query = require('./database_service').execute_query
const responses = require('../common_functions/responses')

const constants = require('../constants/constants')

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

// status - booked, cancelled, completed
// some 1 changes
// some 2 changes

const find_drivers = async (req, res) => {
    try {
        var sql_query = 'select driverID, vehicleID from drivers where driverID not in \
        (select driverID from ride where status="booked")'
        var values = []

        let rows = await execute_query(sql_query, values)
        if (rows.length === 0) {
            return responses.sendServerResponse(res, "No driver found", constants.STATUS_CODES.NOT_FOUND)
        }
        else {
            return responses.sendServerResponse(res, rows, constants.STATUS_CODES.SUCCESS)
        }
    }
    catch (error) {
        return res.json(error)
    }
}

// there can be multiple middleware but single handler function

const check_rides = async (req, res) => {
    try {
        var passengerID = req["passengerID"];
        var driverID = req.body["driverID"];
        var vehicleID = req.body["vehicleID"];
        var sql_query = 'select * from ride where passengerID=? and status="booked"';
        var values = [passengerID]
        let rows = await execute_query(sql_query, values);

        if (rows.length !== 0) {
            throw new Error('You have already booked a ride');
        }

        var sql_query = 'insert into ride values(?, ?, ?, ?, ?, ?)';
        var values = [driverID, vehicleID, passengerID, "booked", new Date(dt.now()), null];


        var ride = await execute_query(sql_query, values);
        console.log(ride);
        return res.json(ride)
    } catch (error) {
        return res.json(error);
    }
}


const cancel_ride = async (req, res) => {
    try {
        const passengerID = req["passengerID"]
        var sql_query = 'update ride set status="cancelled" where passengerID=? and status="booked"'
        var values = [passengerID]
        let result = await execute_query(sql_query, values)
        return responses.sendServerResponse(res, "ride cancelled", constants.STATUS_CODES.SUCCESS)
    }
    catch (error) {
        res.json(error)
    }
}


const completed_ride = async (req, res) => {
    try {
        const passengerID = req["passengerID"]
        var sql_query = 'update ride set status="completed", outTime=? where passengerID=? and status="booked"'
        var values = [new Date(dt.now()), passengerID]
        let result = await execute_query(sql_query, values)
        responses.sendServerResponse(res, result, constants.STATUS_CODES.SUCCESS)
    }
    catch (error) {
        res.json(error)
    }
}


module.exports = { find_drivers, check_rides, cancel_ride, completed_ride }