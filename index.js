const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const { Client } = require('./client.js');
const { MSAgentChatRoom } = require('./room.js');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

let room = new MSAgentChatRoom();

wss.on('connection', (socket) => {
    let client = new Client(socket, room);
    room.addClient(client);
});

let port;
if (process.argv.length < 3 || isNaN(port = parseInt(process.argv[2]))) {
    console.error("Usage: index.js [port]");
    process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
