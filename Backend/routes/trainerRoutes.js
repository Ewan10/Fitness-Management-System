const express = require('express');
const trainerController = require('../controllers/trainerController');

const router = express.Router();

router
    .route('/')
    .get(trainerController.getAllTrainers)
    .post(trainerController.registerTrainer);

router
    .route('/:id')
    .get(trainerController.getTrainer)
    .patch(trainerController.updateTrainer)
    .delete(trainerController.deleteTrainer);

module.exports = router;
