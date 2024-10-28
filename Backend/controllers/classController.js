const Class = require('./../models/classModel');
const catchAsync = require('./../utilities/catchAsync');
const ApplicationError = require('./../utilities/applicationError');

exports.getClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find();
    res.status(201).json({
        status: 'success',
        data: {
            classes
        }
    });
});

exports.getClass = catchAsync(async (req, res, next) => {
    const _class = await Class.findById(req.params.id);

    if (!_class) {
        return next(new ApplicationError('No class found with the given ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            _class
        }
    });
});

exports.createClass = catchAsync(async (req, res, next) => {
    const newClass = await Class.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            _class: newClass
        }
    });
});

exports.updateClass = catchAsync(async (req, res, next) => {
    const _class = await Class.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });
    if (!_class) {
        return next(new ApplicationError('No class found with the given ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            _class
        }
    })
});

exports.deleteClass = catchAsync(async (req, res, next) => {
    const _class = await Class.findByIdAndDelete(req.params.id);

    if (!_class) {
        return next(new AppError('No class found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});