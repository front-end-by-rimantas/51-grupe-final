import dotenv from 'dotenv';

let envFile = '.env';

for (const str of process.argv) {
    if (str.startsWith('--env=')) {
        envFile = str.split('=')[1];
    }
}

dotenv.config({
    path: envFile,
});

export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_USER = process.env.DB_USER ?? 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
export const DB_DATABASE = process.env.DB_DATABASE ?? '';
export const COOKIE_ALLOWED_SYMBOLS = process.env.COOKIE_ALLOWED_SYMBOLS ?? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const COOKIE_SIZE = +process.env.COOKIE_SIZE ?? 10;
export const COOKIE_MAX_AGE = +process.env.COOKIE_MAX_AGE ?? 86400;
export const MESSAGE_MIN_SIZE = +process.env.MESSAGE_MIN_SIZE ?? 1;
export const MESSAGE_MAX_SIZE = +process.env.MESSAGE_MAX_SIZE ?? 128;
