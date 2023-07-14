import { gameData } from "../db/db.js"
export default function Turn (userId) {
    let gameId = gameData.find(game => game.indexPlayer === userId).gameId;
    let game = gameData.find(game => game.gameId === gameId && userId !== game.indexPlayer);
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