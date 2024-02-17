/**
 * Format a duration
 * 
 * @param {number} d: the duration in seconds 
 * @returns {string}
 */
export function FormationDuration(d: number) {
    const minutes: string = Math.floor(d/60).toString();
    const seconds = d%60;
    return minutes + ":" + ((seconds<10)?('0' + seconds) : (seconds)); // If there are less than 10 seconds, append a 0 at the begginning
}