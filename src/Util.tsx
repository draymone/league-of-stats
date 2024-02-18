/**
 * Format a duration
 * 
 * @param {number} d: the duration in seconds 
 * @returns {string}
 */
export function formationDuration(d: number) {
    const minutes: string = Math.floor(d/60).toString();
    const seconds = d%60;
    return minutes + ":" + ((seconds<10)?('0' + seconds) : (seconds)); // If there are less than 10 seconds, append a 0 at the begginning
}

/**
 * 
 * @param {string} s: the string to shorten
 * @param {number} l: the lenght of the string
 * 
 * @returns {string}
 */
export function shortenString(s: string, l: number) {
    if (s.length <= l) {
        return s;
    }

    return s.substring(0, l-3) + '...';
}