import { gameData } from "../db/db.js";
export default function StartGame (clientId) {
    let game = gameData.find(game => game.indexPlayer === clientId);
    return (
        JSON.stringify({
            type: "start_game",
            data:
            JSON.stringify({
                    ships: game.ships,
                    currentPlayerIndex: game.indexPlayer,
                },
            ),
            id: 0,
        })
    )
}


