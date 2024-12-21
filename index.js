const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const Client = require('./client');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'frontend')));

wss.on('connection', (ws, req) => {
    let client = new Client(ws);
});

let port = process.argv[2];
if (!port || isNaN(port = parseInt(port))) {
    console.error("Usage: node index.js [port]");
    process.exit(1);
}

server.listen(port, '127.0.0.1', () => {
    console.log(`Server is listening on port ${port}`);
});
