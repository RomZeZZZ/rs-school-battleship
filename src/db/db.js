export let roomData = [];
export let usersData = [];
export let gameData = [];

// ----------------GAMEDATA
// [{
//     gameId: <number>,
//     ships:
//         [
//             {
//                 position: {
//                     x: <number>,
//                     y: <number>,
//                 },
//                 direction: <boolean>,
//                 length: <number>,
//                 type: "small"|"medium"|"large"|"huge",
//             }
//         ], ...
//     indexPlayer: <number>, /* id of the player in the current game */
// }]