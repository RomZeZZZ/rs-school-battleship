import { gameData } from "../db/db.js"
export default function AddShips (userId, gameId, gamePositions) {
    let game = gameData.find(game => game.gameId === gameId && userId === game.indexPlayer);
    let isAllPlayersReady = false;
    if (game) {
        let index = gameData.findIndex(item => item.indexPlayer === userId);
        if (index !== -1) {
            gameData[index].ships.push(...gamePositions);
        }
        let secondPlayer = gameData.find(game => game.gameId === gameId && userId !== game.indexPlayer);
        if (secondPlayer && (secondPlayer.ships.length !== 0)) {
            isAllPlayersReady = secondPlayer.indexPlayer;
        }
    }
    return isAllPlayersReady;
}