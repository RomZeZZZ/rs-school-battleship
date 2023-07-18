import { gameData } from "../db/db.js";
import AddWinner from "./addWinner.js";
import Finish from "../utils/finish.js";
import UpdateWinners from "../utils/updateWinners.js";
import ClearData from "./clearData.js";
export default function Disconnect (clientId, server) {
    const playerGame = gameData.find(game => game.indexPlayer === clientId);
    let playerGameId;
    let targetPlayer;
    if (playerGame) {
        playerGameId = playerGame.gameId;
        targetPlayer = gameData.find(
            (game) => game.gameId === playerGameId && game.indexPlayer !== clientId
        );
    }
    if (playerGame && targetPlayer) {
        let winnerPlayer;
        server.clients.forEach(client => {
            if (client.clientId === targetPlayer.indexPlayer) {
                winnerPlayer = client;
            }
        });
        AddWinner(targetPlayer.indexPlayer);
        const finish =  Finish(targetPlayer.indexPlayer);
        const updateWinners = UpdateWinners();
        ClearData(clientId);
        if (winnerPlayer) {
            winnerPlayer.send(finish.response);
            winnerPlayer.send(updateWinners);    
        } 
    }
}