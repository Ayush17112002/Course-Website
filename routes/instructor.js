const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const instructorModel = require('../models/instructorModel');


router.post('/login',instructorController.login);
router.post('/signup',instructorModel.uploadedAvatar,instructorController.Create);
router.get('/signup',instructorController.signup);
router.get('/profile',instructorController.profile);
router.post('/signout',instructorController.signout);
module.exports = router;