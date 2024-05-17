import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const HOST = process.env.HOST || 'localhost';
export const API_VERSION = process.env.API_VERSION || 'v1';
export const dbCredentials = {
  type: 'mongodb',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 27017,
  username: process.env.DB_USERNAME || 'admin_pono',
  password: process.env.DB_PASSWORD || 'rGrmJxKvLJKDHe3s',
  database: process.env.DB_NAME || 'library',
};

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library';