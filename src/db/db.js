export let roomData = [];
export let usersData = [];
export let gameData = [];
export let winnersData = [];

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
//         ], 
//          shotMap: 10x10[[],[], ...],
//          shipsPositions: [[[],[],...], ...],
//          coordinatesAroundShips: [],
//          turn: true | false,
//     indexPlayer: <number>, /* id of the player in the current game */
// }]