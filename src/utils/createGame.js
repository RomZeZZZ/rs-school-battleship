import { gameData } from "../db/db.js"
export default function CreateGame (mainUserId, joinUserId) {
    gameData.push({
        gameId: mainUserId,
        ships: [ ],
        indexPlayer: joinUserId, 
    });
    return (
        JSON.stringify({
            type: "create_game",
            data:
                JSON.stringify(
                    {
                        idGame: mainUserId,  
                        idPlayer: joinUserId,
                    },
                ),
            id: 0,
        })
    )
}