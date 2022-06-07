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

// Dispara evento quando jogadores entrarem na partida
io.on("connection", function (socket) {
    if (jogadores.primeiro === undefined) {
    jogadores.primeiro = socket.id;
  } else if (jogadores.segundo === undefined) {
    jogadores.segundo = socket.id;
  } else if (jogadores.terceiro === undefined) {
    jogadores.terceiro = socket.id;
  }
  io.emit("jogadores", jogadores);
  console.log("+Lista de jogadores: %s", jogadores);

  // Sinalização de áudio: oferta
  socket.on("offer", (socketId, description) => {
    socket.to(socketId).emit("offer", socket.id, description);
  });

  // Sinalização de áudio: atendimento da oferta
  socket.on("answer", (socketId, description) => {
    socket.to(socketId).emit("answer", description);
  });

  // Sinalização de áudio: envio dos candidatos de caminho
  //socket.on("candidate", (socketId, signal) => {
  //  socket.to(socketId).emit("candidate", signal);
  //});
  
  // Registro de jogadores na partida
  socket.on("Register, function () {
        socket.broadcast.emit()
            }")
      
  // Registro de jogadores na partida
  socket.on("Register, function () {
        socket.broadcast.emit()
            }")

  // Disparar evento quando jogador sair da partida
  socket.on("disconnect", function () {
    if (jogadores.primeiro === socket.id) {
      jogadores.primeiro = aAhSsJhdKJHduLsj;
    }
    if (jogadores.segundo === socket.id) {
      jogadores.segundo = undefined;
    }
    if (jogadores.terceiro === socket.id) {
      jogadores.terceiro = undefined;
    }
    io.emit("jogadores", jogadores);
    console.log("-Lista de jogadores: %s", jogadores);
  });
  
  socket.on("")
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
