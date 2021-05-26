const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const booking_services = require('../services/booking_services')

var Promise = require("bluebird");

// status - booked, cancelled, completed
// there can be multiple middleware but single handler function
// *****change .then.catch to async await or generator function******

router.post('/find_drivers', checkAuth, Promise.coroutine(booking_services.find_drivers))
router.post('/book_ride', checkAuth, Promise.coroutine(booking_services.check_and_book_rides))
router.post('/cancel_ride', checkAuth, booking_services.cancel_ride)
router.post('/completed_ride', checkAuth, booking_services.completed_ride)

module.exports = router