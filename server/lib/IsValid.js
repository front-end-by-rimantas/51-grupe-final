export class IsValid {
    /**
     * El. pasto adreso validavimas.
     * @param {string} text El. pasto adresas
     * @returns 
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

        return [false, 'Ok'];
    }

    /**
     * Slaptazodzio validavimas.
     * @param {string} text Slaptazodis
     * @returns 
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
}