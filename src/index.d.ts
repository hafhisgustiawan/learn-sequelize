export type IFile = {
  filename: string; //tambahan ini ya, bukan bawaan file
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_EXPIRES_IN: number;
}

declare global {
  namespace Express {
    interface Request {
      requestTime?: string;
      file?: IFile;
      files?: IFile[];
    }
  }
}
