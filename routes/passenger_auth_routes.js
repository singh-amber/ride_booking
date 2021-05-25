const router = require('express').Router();
const passenger_auth_service = require('../services/authentication_service');


router.post('/register_passenger', passenger_auth_service.register_passenger)
router.post('/login_passenger', passenger_auth_service.login_passenger)
router.post('/logout_passenger', passenger_auth_service.logout_passenger)



module.exports = { router };