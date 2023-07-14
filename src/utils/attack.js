import { gameData } from "../db/db.js"
export default function Attack (data) {
    const roomId = data.gameId;
    const shot = [data.x, data.y];
    const playerId = data.indexPlayer;
    let targetPlayer = gameData.find(game => game.gameId === roomId && game.indexPlayer !== playerId);
    return (
        JSON.stringify({
            type: "turn",
            data:
            JSON.stringify({
                    currentPlayer: game.indexPlayer,
                },
            ),
            id: 0,
        })
    );
}