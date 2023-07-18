import { gameData } from "../db/db.js"
export default function IsKilled (data) {
    const shot = [ data.x, data.y ];
    const roomId = data.gameId;
    const playerId = data.indexPlayer;
    const index = gameData.findIndex(item => item.gameId === roomId && item.indexPlayer !== playerId);
    const shipsPositions = gameData[index].shipsPositions;
    const shotMap = gameData[index].shotMap;
    const coordinatesAroundShips = gameData[index].coordinatesAroundShips;
    let isKilled = true;
    let killedShipCoordinates = [];
    let coordinatesAround = [];
    shipsPositions.forEach((element, index) => {
      if (element.some(shipPosition => shipPosition[0] === shot[0] && shipPosition[1] === shot[1])) {
        element.forEach(item => {
          if (shotMap[item[1]][item[0]] !== -1) {
            isKilled = false;
          }
        });
        element.forEach(element => {
          killedShipCoordinates.push({
            x: element[0],
            y: element[1],
          });
        });
        if (isKilled) {
          coordinatesAroundShips[index].forEach(coordinate => {
            if (shotMap[coordinate[1]][coordinate[0]] !== -1) {
              shotMap[coordinate[1]][coordinate[0]] = -1;
              coordinatesAround.push({
                x: coordinate[0],
                y: coordinate[1],
              });
            }
          });
        }
      }
    });
  return {
    isKilled: isKilled,
    killedShipCoordinates: killedShipCoordinates,
    coordinatesAroundShips: coordinatesAround
  };
}