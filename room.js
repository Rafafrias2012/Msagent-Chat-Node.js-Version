const Client = require('./client');

class MSAgentChatRoom {
  constructor() {
    this.clients = [];
  }

  addClient(client) {
    this.clients.push(client);
    client.on('close', () => {
      const index = this.clients.indexOf(client);
      if (index!== -1) {
        this.clients.splice(index, 1);
      }
    });
  }
}

module.exports = MSAgentChatRoom;
