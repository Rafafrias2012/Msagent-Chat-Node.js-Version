const MSAgentProtocolMessageType = {
  // Client-to-server
  Join: "join",
  Talk: "talk",
  // Server-to-client
  AddUser: "adduser",
  RemoveUser: "remuser",
  Message: "msg"
};

const MSAgentProtocolMessage = {
  op: null
};

// Client-to-server

const MSAgentJoinMessage = {
  op: MSAgentProtocolMessageType.Join,
  data: {
    username: ""
  }
};

const MSAgentTalkMessage = {
  op: MSAgentProtocolMessageType.Talk,
  data: {
    msg: ""
  }
};

// Server-to-client

const MSAgentAddUserMessage = {
  op: MSAgentProtocolMessageType.AddUser,
  data: {
    username: ""
  }
};

const MSAgentRemoveUserMessage = {
  op: MSAgentProtocolMessageType.RemoveUser,
  data: {
    username: ""
  }
};
