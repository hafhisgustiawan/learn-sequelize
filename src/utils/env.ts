import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { EnvConfig } from '../index.js';

const config: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || '',
  PORT: (process.env.PORT as unknown as number) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '',
  JWT_COOKIE_EXPIRES_IN:
    (process.env.JWT_COOKIE_EXPIRES_IN as unknown as number) || 0,
};

export default config;
