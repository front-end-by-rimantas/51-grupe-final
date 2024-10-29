export function cookieParser(req, _res, next) {
    let cookiesStrings = [];

    if (req.headers.cookie) {
        cookiesStrings = req.headers.cookie
            .split(';')
            .map(s => s.trim().split('=').map(d => d.trim()));
    }

    req.cookie = Object.fromEntries(cookiesStrings);
    next();
}
