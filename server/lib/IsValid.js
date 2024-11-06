import { MESSAGE_MAX_SIZE, MESSAGE_MIN_SIZE } from "../env.js";

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

        if (typeof text !== 'string') {
            return [true, 'El. pastas turi buti teksto tipo.'];
        }

        if (text.length < minSize) {
            return [true, `El. pastas turi buti ne trumpesnis nei ${minSize} simboliu.`];
        }

        if (text.length > maxSize) {
            return [true, `El. pastas turi buti ne ilgesnis nei ${maxSize} simboliu.`];
        }

        // TODO: aprasyti daugiau taisykliu

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
            return [true, 'Zinute turi buti teksto tipo'];
        }

        if (text.length < MESSAGE_MIN_SIZE) {
            return [true, `Zinute turi buti ne maziau ${MESSAGE_MIN_SIZE} simboliu ilgio`];
        }

        if (text.length > MESSAGE_MAX_SIZE) {
            return [true, `Zinute turi buti ne daugiau ${MESSAGE_MAX_SIZE} simboliu ilgio`];
        }

        return [false, 'Ok'];
    }
}