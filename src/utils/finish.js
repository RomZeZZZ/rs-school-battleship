import { gameData } from "../db/db.js";

export default function Finish (clientId) {
    let isFinish = true;
    let roomId = gameData.find((game) => game.indexPlayer === clientId).gameId;
    let targetPlayer = gameData.find(
        (game) => game.gameId === roomId && game.indexPlayer !== clientId
    );
    if (targetPlayer.shotMap) {
        const shotMap = targetPlayer.shotMap;
        for (let i = 0; i < shotMap.length; i++) {
            for (let j = 0; j < shotMap[i].length; j++) {
            const element = shotMap[i][j];
                if (element !== -1 && element !== 0) {
                    isFinish = false;
                }
            }
        }
    }
    return (
        { 
            isFinish: isFinish,
            response: JSON.stringify({
            type: "finish",
            data:
                JSON.stringify(
                    {
                        winPlayer: clientId,
                    },
                ),
                id: 0,
            })
        }
    );
}