import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const HOST = process.env.HOST || 'localhost';
export const API_VERSION = process.env.API_VERSION || 'v1';
