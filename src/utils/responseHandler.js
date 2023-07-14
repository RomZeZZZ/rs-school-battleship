import RegResponse from "./regResponse.js";
import CreateGame from "./createGame.js";
import CreateRoom from "./createRoom.js";
import StartGame from "./startGame.js";
import UpdateRoom from "./updateRoom.js";
import AddUserToRoom from "./addUserToRoom.js";
import AddShips from "./addShips.js";
import Turn from "./turn.js";
import Attack from "./attack.js";

export default function Handler(request, ws, server) {
    switch (request.type) {
        case "reg":
            ws.send(RegResponse(JSON.parse(request.data), ws));
            server.clients.forEach(client => {
                client.send(UpdateRoom());
            });
            break;
        case "create_room":
            CreateRoom(ws.clientId);
            server.clients.forEach(client => {
                client.send(UpdateRoom());
            });
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
        case "add_ships":
            const gameId = JSON.parse(request.data).gameId;
            const gamePositions = JSON.parse(request.data).ships;
            const isUsersReady = AddShips(ws.clientId, gameId, gamePositions);

            if (isUsersReady) {
                server.clients.forEach(client => {
                    if (client.clientId === isUsersReady) {
                        client.send(StartGame(isUsersReady));
                    } else if (client.clientId === ws.clientId) {
                        client.send(StartGame(ws.clientId));
                    }
                });
                server.clients.forEach(client => {
                    client.send(Turn(ws.clientId));
                });
            }
            break;
        case "attack":
            const data = JSON.parse(request.data);
            Attack(data)
            break;
        default:
            break;
    }
}