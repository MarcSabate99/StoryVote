import express from 'express';
import * as http from "http";
import {Kernel} from "./Kernel";
import {SocketManager} from "./Infrastructure/Socket/SocketManager";
import {Server} from "socket.io";
import * as path from "path";
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const kernel = new Kernel(app, path.resolve());
new SocketManager(io, kernel.getRepository());
kernel.init();

app.use(
    '/utils',
    express.static(path.resolve()+ '/public')
);
app.use(
    '/modules',
    express.static(path.resolve() + '/node_modules')
);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
