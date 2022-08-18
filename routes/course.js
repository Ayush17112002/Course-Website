const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const courseModel = require('../models/courseModel');

router.post('/create',courseModel.uploadedAvatar,courseController.Create);
router.get('/create',courseController.home);
router.get('/update/:id',courseController.getUpdate);
router.post('/update/:id',courseModel.uploadedAvatar,courseController.postUpdate);
router.get('/delete/:id',courseController.delete);

module.exports = router;