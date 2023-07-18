import { gameData } from "../db/db.js";
import IsKilled from "./isKilled.js";
export default function Shot (data) {
    const roomId = data.gameId;
    const playerId = data.indexPlayer;
    let turn = gameData.find(game => game.indexPlayer === playerId).turn;
    let index = gameData.findIndex(item => item.gameId === roomId && item.indexPlayer !== playerId);
    let targetPlayer = gameData.find(
        (game) => game.gameId === roomId && game.indexPlayer !== playerId
    );
    const shotMap = targetPlayer.shotMap;
    let status = "miss";
    let coordinates;
    let coordinatesAround;
    if (!turn) {
      status = false;
    } else if (shotMap[data.y][data.x] === -1) {
      status = false;
    } else if (shotMap[data.y][data.x] === 0) {
      gameData[index].shotMap[data.y][data.x] = -1;
    } else {
      status = "shot";
      gameData[index].shotMap[data.y][data.x] = -1;
      const isKilled = IsKilled(data);
      if (isKilled.isKilled) {
        coordinates = isKilled.killedShipCoordinates;
        coordinatesAround = isKilled.coordinatesAroundShips
        status = "killed";
      }
    }
  return {
    status: status,
    coordinates: coordinates,
    coordinatesAround: coordinatesAround
  };
}