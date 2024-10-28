const Member = require('./../models/memberModel');
const catchAsync = require('./../utilities/catchAsync');
const ApplicationError = require('./../utilities/applicationError');

exports.getAllMembers = catchAsync(async (req, res, next) => {
    const members = await Member.find();
    res.status(200).json(
        members
        // status: 'success',
        // data: {  }


    )
});

exports.getMember = catchAsync(async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return next(new ApplicationError('No member found with the given ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            member
        }
    })
});

exports.registerMember = catchAsync(async (req, res, next) => {

    const newMember = await Member.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            member: newMember
        }
    });
});

exports.updateMember = catchAsync(async (req, res, next) => {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!member) {
        return next(new AppError('No member found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            member
        }
    });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
        return next(new ApplicationError('No member found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
