import { MESSAGE_MAX_SIZE, MESSAGE_MIN_SIZE } from "../env.js";
import { ROLE } from "./enum.js";

export class IsValid {
    /**
     * 
     * @param {Object} clientData Is kliento gautas isparsintas JSON objektas
     * @param {Object[]} requiredFields Privalomu lauku validavimo taisykles
     * @param {string} requiredFields[].field Privalomo lauko pavadinimas
     * @param {Function} requiredFields[].validation Privalomo lauko reiksme validuojanti funkcija / statinis metodas
     * @returns 
     */
    static requiredFields(clientData, requiredFields) {
        if (typeof clientData !== 'object'
            || Array.isArray(clientData)
            || clientData === null
        ) {
            return [true, 'Reikalingas validus objektas'];
        }

        if (Object.keys(clientData).length !== requiredFields.length) {
            const names = requiredFields.map(obj => obj.field).join(', ');
            return [true, 'Reikalingi laukai yra: ' + names];
        }

        for (const { field, validation } of requiredFields) {
            const [err, msg] = validation(clientData[field]);

            if (err) {
                return [err, msg];
            }
        }

        return [false, 'Ok'];
    }

    /**
     * Slapyvardzio validavimas.
     * @param {string} text Slapyvardis
     * @returns {[true, string] | [false, 'Ok']}
     */
    static username(text) {
        const minSize = 3;
        const maxSize = 30;

        if (typeof text !== 'string') {
            return [true, 'Slapyvardis turi buti teksto tipo.'];
        }

        if (text.length < minSize) {
            return [true, `Slapyvardis turi buti ne trumpesnis nei ${minSize} simboliu.`];
        }

        if (text.length > maxSize) {
            return [true, `Slapyvardis turi buti ne ilgesnis nei ${maxSize} simboliu.`];
        }

        // TODO: aprasyti daugiau taisykliu

        return [false, 'Ok'];
    }

    /**
     * El. pasto adreso validavimas.
     * @param {string} text El. pasto adresas
     * @returns {[true, string] | [false, 'Ok']}
     */
    static email(text) {
        const minSize = 6;
        const maxSize = 50;
        const localPartMaxSize = 64;
        const domainPartMaxSize = 255;
        const domainSubPartMaxSize = 63;
        const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.';
        const allowedLocalPartSymbols = abc + '_';
        const allowedDomainPartSymbols = abc;

        if (typeof text !== 'string') {
            return [true, 'El. pastas turi buti teksto tipo.'];
        }

        if (text.length < minSize) {
            return [true, `El. pastas turi buti ne trumpesnis nei ${minSize} simboliu.`];
        }

        if (text.length > maxSize) {
            return [true, `El. pastas turi buti ne ilgesnis nei ${maxSize} simboliu.`];
        }

        if (text.includes('..')) {
            return [true, `El. pastas negali tureti dvieju is eiles einanciu tasku.`];
        }

        const parts = text.split('@');

        if (parts.length < 2) {
            return [true, `El. pastas turi tureti viena "@" simboli.`];
        }

        if (parts.length > 2) {
            return [true, `El. pastas turi tureti tik viena "@" simboli.`];
        }

        const [localPart, domainPart] = parts;

        if (localPart.length > localPartMaxSize) {
            return [true, `El. pasto dalis prie "@" simboli negali virsyti ${localPartMaxSize} simboliu.`];
        }

        if (domainPart.length > domainPartMaxSize) {
            return [true, `El. pasto dalis uz "@" simbolio negali virsyti ${domainPartMaxSize} simboliu.`];
        }

        if (domainPart.includes('_')) {
            return [true, `El. pasto dalis uz "@" simbolio negali tureti "_" simbolio.`];
        }

        for (const s of localPart) {
            if (!allowedLocalPartSymbols.includes(s)) {
                return [true, `El. pasto dalis pries "@" simboli negali tureti "${s}" simbolio.`];
            }
        }

        for (const s of domainPart) {
            if (!allowedDomainPartSymbols.includes(s)) {
                return [true, `El. pasto dalis uz "@" simbolio negali tureti "${s}" simbolio.`];
            }
        }

        const domainSubParts = domainPart.split('.');

        if (domainSubParts.length < 2) {
            return [true, `El. pasto dalis uz "@" simbolio nepanasi i tikro el. pasto tiekejo adresa.`];
        }

        for (const part of domainSubParts) {
            if (part.length > domainSubPartMaxSize) {
                return [true, `El. pasto dalyje uz "@" simbolio tarp tasku esancios dalys negali virsyti ${domainSubPartMaxSize} simboliu kiekio.`];
            }
        }

        return [false, 'Ok'];
    }

    /**
     * Slaptazodzio validavimas.
     * @param {string} text Slaptazodis
     * @returns {[true, string] | [false, 'Ok']}
     */
    static password(text) {
        const minSize = 12;
        const maxSize = 100;

        if (typeof text !== 'string') {
            return [true, 'Slaptazodis turi buti teksto tipo.'];
        }

        if (text.length < minSize) {
            return [true, `Slaptazodis turi buti ne trumpesnis nei ${minSize} simboliu.`];
        }

        if (text.length > maxSize) {
            return [true, `Slaptazodis turi buti ne ilgesnis nei ${maxSize} simboliu.`];
        }

        return [false, 'Ok'];
    }

    static postMessage(text) {
        if (typeof text !== 'string') {
            return [true, 'Zinute turi buti teksto tipo.'];
        }

        if (text.length < MESSAGE_MIN_SIZE) {
            return [true, `Zinute turi buti ne maziau ${MESSAGE_MIN_SIZE} simboliu ilgio.`];
        }

        if (text.length > MESSAGE_MAX_SIZE) {
            return [true, `Zinute turi buti ne daugiau ${MESSAGE_MAX_SIZE} simboliu ilgio.`];
        }

        return [false, 'Ok'];
    }

    static id(number) {
        if (typeof number !== 'number'
            || !Number.isInteger(number)
            || number < 1
            || number > Number.MAX_SAFE_INTEGER
        ) {
            return [true, 'ID turi buti teigiamas sveikasis skaiciaus.'];
        }

        return [false, 'Ok'];
    }

    static role(role) {
        if (typeof role !== 'string') {
            return [true, 'Role turi buti teksto tipo.'];
        }

        const allowedOptions = Object.values(ROLE).filter(role => role !== ROLE.PUBLIC);
        if (!allowedOptions.includes(role)) {
            return [true, 'Galimos pasirinkti roles yra: ' + allowedOptions.join(', ') + '.'];
        }

        return [false, 'Ok'];
    }
}