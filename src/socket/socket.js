import { WebSocketServer } from "ws";
import Handler from "../utils/responseHandler.js";
const server = new WebSocketServer({ port: 3000 });

server.on('connection', (ws) => {

    // server.clients.forEach(client => {
    //     client.send(res);
    // });
    ws.on('message', (message) => {
        const req = JSON.parse(message);
        Handler(req, ws, server);
    });
    ws.on('close', () => {
        console.log('WebSocket соединение закрыто');
    });
});