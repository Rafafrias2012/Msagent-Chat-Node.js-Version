const EventEmitter = require('events');
const WebSocket = require('ws');

class Client extends EventEmitter {
  constructor(socket) {
    super();
    this.username = null;
    this.socket = socket;
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

  parseMessage(msg) {

  }
}

module.exports = Client;
