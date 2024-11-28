import { IsValid } from "./IsValid.js";

describe('Nevalidus "username" duomenu tipas', () => {
    test('Number', () => {
        const [err, msg] = IsValid.username(5);
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti teksto tipo.');
    });
});