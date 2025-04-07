// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
<<<<<<< HEAD
const spotsRouter = require('./spots.js')

const bookingsRouter = require('./bookings');
=======
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
>>>>>>> 001631d5e99e8b73a90b97add664cd2835643412
const { restoreUser } = require("../../utils/auth.js");



// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

<<<<<<< HEAD
router.use('/bookings', bookingsRouter);
=======
router.use('/reviews', reviewsRouter);
>>>>>>> 001631d5e99e8b73a90b97add664cd2835643412

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;