export function randomString(length = 20) {
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * abc.length);
        str += abc[index];
    }

    return str;
}