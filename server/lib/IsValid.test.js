import { MESSAGE_MAX_SIZE, MESSAGE_MIN_SIZE } from "../env.js";
import { IsValid } from "./IsValid.js";

describe('"username" duomenu tipas', () => {
    test('Nevalidus: number', () => {
        const [err, msg] = IsValid.username(5);
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti teksto tipo.');
    });
    test('Nevalidus: boolean', () => {
        const [err, msg] = IsValid.username(true);
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti teksto tipo.');
    });
    test('Nevalidus: object', () => {
        const [err, msg] = IsValid.username({});
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti teksto tipo.');
    });
    test('Nevalidus: array', () => {
        const [err, msg] = IsValid.username([]);
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti teksto tipo.');
    });
});

describe('"username" string ilgis', () => {
    test('Tuscias tekstas', () => {
        const [err, msg] = IsValid.username('');
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti ne trumpesnis nei 3 simboliu.');
    });
    test('Per trumpas', () => {
        const [err, msg] = IsValid.username('La');
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti ne trumpesnis nei 3 simboliu.');
    });
    test('Tinkamas trumpiausias tekstas', () => {
        const [err, msg] = IsValid.username('a'.repeat(3));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Ok', () => {
        const [err, msg] = IsValid.username('Labas');
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Tinkamas ilgiausias tekstas', () => {
        const [err, msg] = IsValid.username('a'.repeat(30));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Netinkamas - vienu simboliu per daug', () => {
        const [err, msg] = IsValid.username('a'.repeat(31));
        expect(err).toBe(true);
        expect(msg).toBe('Slapyvardis turi buti ne ilgesnis nei 30 simboliu.');
    });
});

describe('"password" duomenu tipas', () => {
    test('Nevalidus: number', () => {
        const [err, msg] = IsValid.password(5);
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti teksto tipo.');
    });
    test('Nevalidus: boolean', () => {
        const [err, msg] = IsValid.password(true);
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti teksto tipo.');
    });
    test('Nevalidus: object', () => {
        const [err, msg] = IsValid.password({});
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti teksto tipo.');
    });
    test('Nevalidus: array', () => {
        const [err, msg] = IsValid.password([]);
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti teksto tipo.');
    });
});

describe('"password" string ilgis', () => {
    test('Tuscias tekstas', () => {
        const [err, msg] = IsValid.password('');
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti ne trumpesnis nei 12 simboliu.');
    });
    test('Per trumpas', () => {
        const [err, msg] = IsValid.password('a'.repeat(11));
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti ne trumpesnis nei 12 simboliu.');
    });
    test('Tinkamas trumpiausias tekstas', () => {
        const [err, msg] = IsValid.password('a'.repeat(12));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Ok', () => {
        const [err, msg] = IsValid.password('Labas rytas suraitytas');
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Tinkamas ilgiausias tekstas', () => {
        const [err, msg] = IsValid.password('a'.repeat(100));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Netinkamas - vienu simboliu per daug', () => {
        const [err, msg] = IsValid.password('a'.repeat(101));
        expect(err).toBe(true);
        expect(msg).toBe('Slaptazodis turi buti ne ilgesnis nei 100 simboliu.');
    });
});

describe('"postMessage" duomenu tipas', () => {
    test('Nevalidus: number', () => {
        const [err, msg] = IsValid.postMessage(5);
        expect(err).toBe(true);
        expect(msg).toBe('Zinute turi buti teksto tipo.');
    });
    test('Nevalidus: boolean', () => {
        const [err, msg] = IsValid.postMessage(true);
        expect(err).toBe(true);
        expect(msg).toBe('Zinute turi buti teksto tipo.');
    });
    test('Nevalidus: object', () => {
        const [err, msg] = IsValid.postMessage({});
        expect(err).toBe(true);
        expect(msg).toBe('Zinute turi buti teksto tipo.');
    });
    test('Nevalidus: array', () => {
        const [err, msg] = IsValid.postMessage([]);
        expect(err).toBe(true);
        expect(msg).toBe('Zinute turi buti teksto tipo.');
    });
});

describe('"postMessage" string ilgis', () => {
    test('Tuscias tekstas', () => {
        const [err, msg] = IsValid.postMessage('');
        expect(err).toBe(true);
        expect(msg).toBe(`Zinute turi buti ne maziau ${MESSAGE_MIN_SIZE} simboliu ilgio.`);
    });
    test('Per trumpas', () => {
        const [err, msg] = IsValid.postMessage('a'.repeat(MESSAGE_MIN_SIZE - 1));
        expect(err).toBe(true);
        expect(msg).toBe(`Zinute turi buti ne maziau ${MESSAGE_MIN_SIZE} simboliu ilgio.`);
    });
    test('Tinkamas trumpiausias tekstas', () => {
        const [err, msg] = IsValid.postMessage('a'.repeat(MESSAGE_MIN_SIZE));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Ok', () => {
        const [err, msg] = IsValid.postMessage('Labas rytas suraitytas');
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Tinkamas ilgiausias tekstas', () => {
        const [err, msg] = IsValid.postMessage('a'.repeat(MESSAGE_MAX_SIZE));
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Tinkamas ilgiausias tekstas', () => {
        const [err, msg] = IsValid.postMessage('a'.repeat(MESSAGE_MAX_SIZE + 1));
        expect(err).toBe(true);
        expect(msg).toBe(`Zinute turi buti ne daugiau ${MESSAGE_MAX_SIZE} simboliu ilgio.`);
    });
});

describe('"id" duomenu tipas', () => {
    test('Nevalidus: boolean', () => {
        const [err, msg] = IsValid.id(true);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('Nevalidus: object', () => {
        const [err, msg] = IsValid.id({});
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('Nevalidus: array', () => {
        const [err, msg] = IsValid.id([]);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('Nevalidus: string', () => {
        const [err, msg] = IsValid.id('');
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('Nevalidus: function', () => {
        const [err, msg] = IsValid.id(() => { });
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
});

describe('"id" reiksmes', () => {
    test('Infinity', () => {
        const [err, msg] = IsValid.id(Infinity);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('-Infinity', () => {
        const [err, msg] = IsValid.id(-Infinity);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('NaN', () => {
        const [err, msg] = IsValid.id(NaN);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('-5', () => {
        const [err, msg] = IsValid.id(-5);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('-3.14', () => {
        const [err, msg] = IsValid.id(-3.14);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('3.14', () => {
        const [err, msg] = IsValid.id(3.14);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
    test('1', () => {
        const [err, msg] = IsValid.id(1);
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('4562154', () => {
        const [err, msg] = IsValid.id(4562154);
        expect(err).toBe(false);
        expect(msg).toBe('Ok');
    });
    test('Per didelis', () => {
        const [err, msg] = IsValid.id(Number.MAX_SAFE_INTEGER + 1);
        expect(err).toBe(true);
        expect(msg).toBe('ID turi buti teigiamas sveikasis skaiciaus.');
    });
});