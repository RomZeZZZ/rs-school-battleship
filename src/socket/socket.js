import { WebSocketServer } from "ws";
import Handler from "../utils/responseHandler.js";
import Disconnect  from "../methods/disconnect.js";
const server = new WebSocketServer({ port: 3000 });

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        const req = JSON.parse(message);
        Handler(req, ws, server);
    });
    ws.on('close', () => {
        Disconnect(ws.clientId, server);
        console.log('WebSocket соединение закрыто');
    });
});


