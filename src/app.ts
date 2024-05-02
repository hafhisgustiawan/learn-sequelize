import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

//fn or class import
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import productRouter from './routes/productRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// app.enable('trust proxy'); // error for rate limitting

// implement CORS
app.use(cors());
app.options('*', cors());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// security http headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit route for api specific on other then get
const specLimit = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000, //1 hour
  message: 'Too many requrest from this IP, please try again in an hour',
  skip: (req) => req.method.toLowerCase() === 'get',
});
app.use('/api', specLimit);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '1000kb' }));

// reading url encoded // gak perlu install body parser
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));

// reading cookies from incoming request
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss()); //clear html in request

// untuk melakukan kompres semua text data yang dikirim ke client
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
