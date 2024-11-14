import { createHash } from 'crypto';

export function hash(text) {
    return createHash('sha512', { encoding: 'utf8' }).update(text).digest('hex');
}