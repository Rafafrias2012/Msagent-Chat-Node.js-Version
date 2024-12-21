const EventEmitter = require('events');
const WebSocket = require('ws');
const { MSAgentProtocolMessageType } = require('./protocol.js'); // Adjust the path as necessary
const { MSAgentChatRoom } = require('./room.js');

class Client extends EventEmitter {
    constructor(socket, room) {
        super();
        this.socket = socket;
        this.room = room;
        this.username = null;
        this.socket.on('message', (msg, isBinary) => {
            if (isBinary) {
                this.socket.close();
                return;
            }
            this.parseMessage(msg.toString('utf-8'));
        });
        this.socket.on('error', () => {});
        this.socket.on('close', () => {
            this.emit('close');
        });
    }

    send(msg) {
        return new Promise((res, rej) => {
            this.socket.send(JSON.stringify(msg), err => {
                if (err) {
                    rej(err);
                    return;
                }
                res();
            });
        });
    }

    parseMessage(data) {
        let msg;
        try {
            msg = JSON.parse(data);
        } catch {
            this.socket.close();
            return;
        }
        switch (msg.op) {
            case MSAgentProtocolMessageType.Join: {
                break;
            }
            case MSAgentProtocolMessageType.Talk: {
                break;
            }
        }
    }
}

module.exports = Client;
