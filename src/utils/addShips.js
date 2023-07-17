import { gameData } from "../db/db.js"
import CellsAroundShips from "../methods/cellsAroundShips.js";
export default function AddShips (userId, gameId, gamePositions, shotMap, shipsPositions) {
    let game = gameData.find(game => game.gameId === gameId && userId === game.indexPlayer);
    let isAllPlayersReady = false;
    let aroundShips = CellsAroundShips(shipsPositions);
    if (game) {
        let index = gameData.findIndex(item => item.indexPlayer === userId);
        if (index !== -1) {
            gameData[index].shotMap = shotMap;
            gameData[index].shipsPositions = shipsPositions;
            gameData[index].coordinatesAroundShips = aroundShips;
            gameData[index].turn = false;
            gameData[index].ships.push(...gamePositions);

        }
        let secondPlayer = gameData.find(game => game.gameId === gameId && userId !== game.indexPlayer);
        if (secondPlayer && (secondPlayer.ships.length !== 0)) {
            isAllPlayersReady = secondPlayer.indexPlayer;
        }
    }
    return isAllPlayersReady;
}