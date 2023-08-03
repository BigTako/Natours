const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

/*
  Without a mergeParams: true(or when set to false) we will not have an access to tourId
  in route /:tourId/reviews. 
 */
const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);
module.exports = router;
