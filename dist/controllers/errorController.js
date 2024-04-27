import AppError from '../utils/appError.js';
const handleJWTError = () => new AppError('Invalid token. Please login again', 401);
const handleJWTExpiredError = () => new AppError('Your token is expired. Please login again', 401);
const sendErrorDev = (err, req, res) => {
    console.log('💥ERROR from errorController', err);
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, req, res) => {
    console.log('💥ERROR from errorController', err);
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }
    else {
        if (err.name === 'JsonWebTokenError') {
            err = handleJWTError();
        }
        if (err.name === 'TokenExpiredError') {
            err = handleJWTExpiredError();
        }
        sendErrorProd(err, req, res);
    }
};
