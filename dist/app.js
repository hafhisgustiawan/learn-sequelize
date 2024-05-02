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
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import productRouter from './routes/productRouter.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const specLimit = rateLimit({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requrest from this IP, please try again in an hour',
    skip: (req) => req.method.toLowerCase() === 'get',
});
app.use('/api', specLimit);
app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));
app.use(cookieParser());
app.use(xss());
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
