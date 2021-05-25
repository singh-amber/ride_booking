const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const booking_services = require('../services/booking_services')

// status - booked, cancelled, completed
// there can be multiple middleware but single handler function
// *****change .then.catch to async await or generator function******

router.post('/find_drivers', checkAuth, booking_services.find_drivers)
router.post('/book_ride', checkAuth, booking_services.check_rides)
router.post('/cancel_ride', checkAuth, booking_services.cancel_ride)
router.post('/completed_ride', checkAuth, booking_services.completed_ride)

module.exports = router