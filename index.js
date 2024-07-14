const Fastify = require('fastify');
const FastifyWS = require('@fastify/websocket');
const FastifyStatic = require('@fastify/static');
const Client = require('./client');

const app = Fastify({ logger: true, });

app.register(FastifyWS);
app.register(FastifyStatic, {
  root: './frontend', // serve files from the frontend folder
  prefix: '/', // serve files at the root URL
});

app.get("/socket", {websocket: true}, (socket, req) => {
  let client = new Client(socket);
});

let port;
if (process.argv.length < 3 || isNaN(port = parseInt(process.argv[2]))) {
  console.error("Usage: index.js [port]");
  process.exit(1);
}
app.listen({host: "127.0.0.1", port});
