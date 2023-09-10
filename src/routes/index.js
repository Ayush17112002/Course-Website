const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const instructorRoute = require('./instructor');
const courseRoute = require('./course');

router.get('/',homeController.home);
router.use('/course', courseRoute);
router.use('/user', instructorRoute);

module.exports = router;