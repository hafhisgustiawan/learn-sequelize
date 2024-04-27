import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const config = {
    NODE_ENV: process.env.NODE_ENV || '',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '',
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 0,
};
export default config;
