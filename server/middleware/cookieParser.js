export function cookieParser(req, _res, next) {
    const cookiesStrings = req.headers.cookie
        .split(';')
        .map(s => s.trim().split('=').map(d => d.trim()));

    req.cookie = Object.fromEntries(cookiesStrings);
    next();
}