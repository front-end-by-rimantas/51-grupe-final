export function formatTime(postTime) {
    const msDif = Date.now() - (new Date(postTime)).getTime();
    const minDif = Math.floor(msDif / (1000 * 60));
    const hourDif = Math.floor((msDif / (1000 * 60 * 60)));
    const daysDif = Math.floor((msDif / (1000 * 60 * 60 * 24)));

    if (minDif < 1) {
        return 'Šviežiai iškepta';
    } else if (minDif % 10 === 0 && minDif < 60) {
        return 'Prieš ' + minDif + ' minučių';
    } else if (minDif % 10 === 1 && minDif !== 11 && minDif < 60) {
        return 'Prieš ' + minDif + ' minutę';
    } else if (minDif < 60) {
        return 'Prieš ' + minDif + ' minutes';
    } else if (hourDif === 1 || hourDif === 21 && hourDif < 24) {
        return 'Prieš ' + hourDif + ' valandą';
    } else if (hourDif >= 10 && hourDif <= 20) {
        return 'Prieš ' + hourDif + ' valandų';
    } else if (hourDif < 24) {
        return 'Prieš ' + hourDif + ' valandas';
    } else if (daysDif % 10 === 1 && daysDif !== 11) {
        return 'Prieš ' + daysDif + ' dieną';
    } else if (daysDif % 10 === 0) {
        return 'Prieš ' + daysDif + ' dienų';
    } else if (daysDif < 10) {
        return 'Prieš ' + daysDif + ' dienas';
    } else if (daysDif < 30) {
        return 'Prieš ' + daysDif + ' dienų';
    } else {
        return 'Prieš ' + daysDif + ' dienas';
    }
}

/*
1, 21, 31, 41, 51 -> minute
11 -> minutes
*/