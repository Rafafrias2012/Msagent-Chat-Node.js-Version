const Fastify = require('fastify');
const FastifyWS = require('@fastify/websocket');
const Client = require('./client');

const app = Fastify({
  logger: true,
});

app.register(FastifyWS);

app.get("/socket", {websocket: true}, (socket, req) => {
  let client = new Client(socket);
});

let port;
if (process.argv.length < 3 || isNaN(port = parseInt(process.argv[2]))) {
  console.error("Usage: index.js [port]");
  process.exit(1);
}
app.listen({host: "127.0.0.1", port});
