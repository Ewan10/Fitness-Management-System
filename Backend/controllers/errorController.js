const ApplicationError = require('./../utilities/applicationError');

const handleCastErrorDB = error => {
    const message = `Invalid ${error.path}: ${error.value}.`
    return new ApplicationError(message, 400);
};

const handleValidationErrorDB = error => {
    const errors = Object.values(error.errors).map(element => element.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ApplicationError(message, 400);
};

const sendErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        console.log('error.message: ', err.message)

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            errorType: err.isOperational
        });
    } else {
        console.log('Error: ', err)
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong.',
            errorType: err.isOperational
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let errorCopy = { ...err };
        console.log('error.name: ', errorCopy)
        console.log('error.name: ', errorCopy.name)
        console.log('error.isOperational: ', errorCopy.isOperational)


        if (errorCopy.name === 'CastError') errorCopy = handleCastErrorDB(errorCopy);
        if (errorCopy.name === 'Validation')
            errorCopy = handleValidationErrorDB(errorCopy);
        sendErrorProd(errorCopy, res);
    }
};