import { gameData } from "../db/db.js"
export default function Turn (userId) {
    let gameId = gameData.find(game => game.indexPlayer === userId).gameId;
    let indexCurrentPlayer = gameData.findIndex(item => item.gameId === gameId && item.indexPlayer === userId);
    let indexSecondPlayer = gameData.findIndex(item => item.gameId === gameId && item.indexPlayer !== userId);
    gameData[indexCurrentPlayer].turn = false;
    gameData[indexSecondPlayer].turn = true;
    return (
        JSON.stringify({
            type: "turn",
            data:
            JSON.stringify({
                    currentPlayer: gameData[indexSecondPlayer].indexPlayer,
                },
            ),
            id: 0,
        })
    );
}