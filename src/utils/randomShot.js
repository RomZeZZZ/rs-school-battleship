import { gameData } from "../db/db.js"
export default function RandomShot (data) {
    let randomData = data;
    const roomId = data.gameId;
    const playerId = data.indexPlayer;
    let targetPlayer = gameData.find(
        (game) => game.gameId === roomId && game.indexPlayer !== playerId
    );
    const shotMap = targetPlayer.shotMap;
    let randomRowIndex, randomColIndex;
    while (true) {
        randomRowIndex = Math.floor(Math.random() * 10);
        randomColIndex = Math.floor(Math.random() * 10);
        if (shotMap[randomColIndex][randomRowIndex] === -1) {
          continue;
        }
        break;
    }
    randomData.x = randomRowIndex;
    randomData.y = randomColIndex;
    return randomData;
}