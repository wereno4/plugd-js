/*
* config variable
*/

const config = {
    apiKey: '', //Youtube API Key
    onAir: false, // Check if the party is opened or not
    title: '', // Name of the party
    id: '', //ID key of the party to check session is valid
    participants: 0, //Number of participants
    keycode: [], //Generated keycodes for participants
    nextPlayer: 0, //Index number of next player
    isQueueEmpty: true // Check if the party queue is empty
};

/*
* users variable is a array of the user's objects.
* The object contains username (as string), user's keycode (as string), user's playlist queue (as array).
* users[index].queue array is consist of video objects.
*
*/
const users = [];

module.exports = { config, users };
