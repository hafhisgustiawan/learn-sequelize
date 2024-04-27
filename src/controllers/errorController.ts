import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError.js';

const handleJWTError = () =>
  new AppError('Invalid token. Please login again', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token is expired. Please login again', 401);

interface IError {
  code: number;
  name: string;
}

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  console.log('💥ERROR from errorController', err);

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  console.log('💥ERROR from errorController', err);

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  //  ketika ada middleware dg 4 parameter ini maka akan dideteksi sebagai global error handler
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    if ((err as any as IError).name === 'JsonWebTokenError') {
      err = handleJWTError();
    }
    if ((err as any as IError).name === 'TokenExpiredError') {
      err = handleJWTExpiredError();
    }

    sendErrorProd(err, req, res);
  }
};
