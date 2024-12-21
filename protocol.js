// Enum for message types
const MSAgentProtocolMessageType = {
    Join: "join",
    Talk: "talk",
    Init: "init",
    AddUser: "adduser",
    RemoveUser: "remuser",
    Message: "msg"
};

// Base protocol message
class MSAgentProtocolMessage {
    constructor(op) {
        this.op = op;
    }
}

// Client-to-server messages

class MSAgentJoinMessage extends MSAgentProtocolMessage {
    constructor(username) {
        super(MSAgentProtocolMessageType.Join);
        this.data = { username };
    }
}

class MSAgentTalkMessage extends MSAgentProtocolMessage {
    constructor(msg) {
        super(MSAgentProtocolMessageType.Talk);
        this.data = { msg };
    }
}

// Server-to-client messages

class MSAgentInitMessage extends MSAgentProtocolMessage {
    constructor(users) {
        super(MSAgentProtocolMessageType.Init);
        this.data = { users };
    }
}

class MSAgentAddUserMessage extends MSAgentProtocolMessage {
    constructor(username) {
        super(MSAgentProtocolMessageType.AddUser);
        this.data = { username };
    }
}

class MSAgentRemoveUserMessage extends MSAgentProtocolMessage {
    constructor(username) {
        super(MSAgentProtocolMessageType.RemoveUser);
        this.data = { username };
    }
}
