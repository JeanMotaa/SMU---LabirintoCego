const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

var jogadores = {
  primeiro: undefined,
  segundo: undefined,
  terceiro: undefined,
};
io.on("connection", function (socket) {
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
