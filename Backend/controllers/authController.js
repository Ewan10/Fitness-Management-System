const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const ApplicationError = require('./../utilities/applicationError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;      // Removes the password from the output.

    res.status(statusCode).json({
        message: 'User logged in successfully',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            expiresInMiliSec: process.env.JWT_EXPIRES * 60 * 60 * 1000,
        },
    });
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12)
    });

    createSendToken(newUser, 201, res);

});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApplicationError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new ApplicationError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, res);
});
