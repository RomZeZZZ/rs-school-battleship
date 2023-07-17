import { gameData } from "../db/db.js";
export default function ClearData (clientId) {
    const playerGame = gameData.find(game => game.indexPlayer === clientId);
    const playerGameId = playerGame.gameId;
    let indexCurrentUser = gameData.findIndex(item => item.gameId === playerGameId && item.indexPlayer !== clientId);
    if (indexCurrentUser !== -1) {
        gameData.splice(indexCurrentUser, 1);
    }    
    let indexSecondUser = gameData.findIndex(item => item.gameId === playerGameId && item.indexPlayer === clientId);
    if (indexSecondUser !== -1) {
        gameData.splice(indexSecondUser, 1);
    }  
}