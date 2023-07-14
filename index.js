import { httpServer } from "./src/http_server/index.js";
import "./src/socket/socket.js";
const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
    console.log(`Start static HTTP server on port ${HTTP_PORT}!`);
});

