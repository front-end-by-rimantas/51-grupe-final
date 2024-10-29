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

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const COOKIE_ALLOWED_SYMBOLS = process.env.COOKIE_ALLOWED_SYMBOLS;
export const COOKIE_SIZE = +process.env.COOKIE_SIZE;
export const COOKIE_MAX_AGE = +process.env.COOKIE_MAX_AGE;
