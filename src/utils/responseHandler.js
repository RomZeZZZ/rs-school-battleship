import RegResponse from "./regResponse.js";
import CreateGame from "./createGame.js";
import CreateRoom from "./createRoom.js";
import StartGame from "./startGame.js";
import UpdateRoom from "./updateRoom.js";
import AddUserToRoom from "./addUserToRoom.js";
import AddShips from "./addShips.js";
import Turn from "./turn.js";
import Attack from "./attack.js";
import ShotMap from "./shotMap.js";
import { gameData } from "../db/db.js";
import { roomData } from "../db/db.js";
import CreatePositions from "../methods/createPositions.js";
import Finish from "./finish.js";
import AddWinner from "../methods/addWinner.js";
import UpdateWinners from "./updateWinners.js";
import ClearData from "../methods/clearData.js";
export default async function Handler(request, ws, server) {
    let clients = [];
    let data;
    let targetPlayer;
    let isRandomAttack;
    let finish;
    let updateWinners;
    switch (request.type) {
        case "reg":
            ws.send(RegResponse(JSON.parse(request.data), ws));
            server.clients.forEach(client => {
                client.send(UpdateRoom());
                client.send(UpdateWinners());
            });
            break;
        case "create_room":
            let isRoomCreated = roomData.find(room => room.roomId === ws.clientId);
            if (!isRoomCreated) {
                CreateRoom(ws.clientId);
                server.clients.forEach(client => {
                    client.send(UpdateRoom());
                });
            }
            break;
        case "add_user_to_room":
            const indexRoom = JSON.parse(request.data).indexRoom;
            const isUserAdded = AddUserToRoom(indexRoom, ws.clientId);
            if (isUserAdded) {
                server.clients.forEach(client => {
                    client.send(UpdateRoom());
                });
                server.clients.forEach(client => {
                    if (client.clientId === isUserAdded) {
                        client.send(CreateGame(isUserAdded, isUserAdded));
                    } else if (client.clientId === ws.clientId) {
                        client.send(CreateGame(isUserAdded, ws.clientId));
                    }
                });
            }
            break;
        case "add_ships":
            const gameId = JSON.parse(request.data).gameId;
            const gamePositions = JSON.parse(request.data).ships;
            let shotMap = ShotMap(gamePositions);
            let shipsPositions = CreatePositions(gamePositions);
            const isUsersReady = AddShips(ws.clientId, gameId, gamePositions, shotMap, shipsPositions);
            clients = [];
            server.clients.forEach(client => {
                if (client.clientId === isUsersReady || client.clientId === ws.clientId) {
                    clients.push(client);
                }
            });
            if (isUsersReady) {
                clients.forEach(client => client.send(StartGame(client.clientId)));
                clients.forEach(client => client.send(Turn(ws.clientId)));
            }
            break;
        case "attack":
            data = JSON.parse(request.data);
            isRandomAttack = false;
            targetPlayer = gameData.find(
                (game) => game.gameId === data.gameId && game.indexPlayer !== data.indexPlayer
            );
            clients = [];
            server.clients.forEach(client => {
                if (client.clientId === targetPlayer.indexPlayer || client.clientId === ws.clientId) {
                    clients.push(client);
                }
            });
            const attack = Attack(data, isRandomAttack);
            if (attack.status === "shot") {
                clients.forEach(client => client.send(JSON.stringify(attack.response)));
                clients.forEach(client => client.send(Turn(ws.clientId)));
            } else if (attack.status === "killed") {
                attack.response.forEach(killResponse => {
                    clients.forEach(client => client.send(JSON.stringify(killResponse)));
                    clients.forEach(client => client.send(Turn(ws.clientId)));
                });
            }
            finish =  Finish(ws.clientId);
            if (finish.isFinish) {
                AddWinner(ws.clientId);
                updateWinners = UpdateWinners();
                ClearData(ws.clientId);
                clients.forEach(client => client.send(finish.response));
                clients.forEach(client => client.send(updateWinners));
            } 
            break;
        case "randomAttack":
            data = JSON.parse(request.data);
            isRandomAttack = true;
            targetPlayer = gameData.find(
                (game) => game.gameId === data.gameId && game.indexPlayer !== data.indexPlayer
            );
            clients = [];
            server.clients.forEach(client => {
                if (client.clientId === targetPlayer.indexPlayer || client.clientId === ws.clientId) {
                    clients.push(client);
                }
            });
            const randomAttack = Attack(data, isRandomAttack);
            if (randomAttack.status === "shot") {
                clients.forEach(client => client.send(JSON.stringify(randomAttack.response)));
                clients.forEach(client => client.send(Turn(ws.clientId)));
            } else if (randomAttack.status === "killed") {
                randomAttack.response.forEach(killResponse => {
                    clients.forEach(client => client.send(JSON.stringify(killResponse)));
                    clients.forEach(client => client.send(Turn(ws.clientId)));
                });
            }
            finish =  Finish(ws.clientId);
            if (finish.isFinish) {
                AddWinner(ws.clientId);
                updateWinners = UpdateWinners();
                ClearData(ws.clientId);
                clients.forEach(client => client.send(finish.response));
                clients.forEach(client => client.send(updateWinners));
            }    
            break;
    }
}