import { gameData } from "../db/db.js";
import AddWinner from "./addWinner.js";
import Finish from "../utils/finish.js";
import UpdateWinners from "../utils/updateWinners.js";
export default function Disconnect (clientId, server) {
    const playerGameId = gameData.find(game => game.indexPlayer === clientId).gameId;
    const targetPlayer = gameData.find(
        (game) => game.gameId === playerGameId && game.indexPlayer !== clientId
    );
    let winnerPlayer;
    server.clients.forEach(client => {
        if (client.clientId === targetPlayer.indexPlayer) {
            winnerPlayer = client;
        }
    });
    AddWinner(targetPlayer.indexPlayer);
    const finish =  Finish(targetPlayer.indexPlayer);
    const updateWinners = UpdateWinners();
    winnerPlayer.send(finish.response);
    winnerPlayer.send(updateWinners);          
}