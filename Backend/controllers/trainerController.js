const Trainer = require('../models/trainerModel');
const catchAsync = require('../utilities/catchAsync');
const ApplicationError = require('../utilities/applicationError');

exports.getAllTrainers = catchAsync(async (req, res, next) => {
    const trainers = await Trainer.find();
    res.status(201).json({
        status: 'success',
        data: {
            trainers
        }
    });
});

exports.getTrainer = catchAsync(async (req, res, next) => {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
        return next(new ApplicationError('No trainer found with the given ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            trainer
        }
    })
});

exports.registerTrainer = catchAsync(async (req, res, next) => {
    const newTrainer = await Trainer.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            trainer: newTrainer
        }
    });
});

exports.updateTrainer = catchAsync(async (req, res, next) => {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!trainer) {
        return next(new ApplicationError('No trainer found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            trainer
        }
    })
});

exports.deleteTrainer = catchAsync(async (req, res, next) => {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    if (!trainer) {
        return next(new ApplicationError('No trainer found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
