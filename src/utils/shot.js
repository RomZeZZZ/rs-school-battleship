import { gameData } from "../db/db.js"
export default function Shot (data) {
    const roomId = data.gameId;
    const shot = [data.x, data.y];
    const playerId = data.indexPlayer;

    let targetPlayer = gameData.find(
        (game) => game.gameId === roomId && game.indexPlayer !== playerId
    );

    const shotMap = targetPlayer.shotMap;
    let status = "miss";
    for (let i = 0; i < shotMap.length; i++) {
        const ship = shotMap[i];

        if (ship.some((coord) => coord[0] === shot[0] && coord[1] === shot[1])) {
        shotMap.splice(i, 1);
        status = "shot";
        break;
        }
    }
    const response = {
        type: "attack",
        data: JSON.stringify({
          position: {
            x: data.x,
            y: data.y,
          },
          currentPlayer: playerId,
          status: status,
        }),
        id: 0,
    };
    return response;
}