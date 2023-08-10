const express = require('express');
const tourDateController = require('./../controllers/tourDateController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').post(tourDateController.createTourDate);

module.exports = router;
