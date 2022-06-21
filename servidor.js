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
io.on("connection", (socket) => {
  socket.on("register", (sid) => {
    if (jogadores.primeiro === undefined) {
      jogadores.primeiro = {
        nome: sid,
        id_sala: "labirintoCegoSala",
        dono_sala: true,
      };
      socket.join(jogadores.primeiro.id_sala);
      io.to(sid).emit("register-ok", jogadores.primeiro);
      console.log(jogadores.primeiro);
    }
    // else if (jogadores.segundo === undefined) {
    //   var jogador = {
    //     nome: socket.id,
    //     id_sala: "labirintoCegoSala",
    //     dono_sala: false,
    //   };

    //   jogadores.segundo = jogador;
    //   // se jogador possui o acesso a sala, entra na partida
    //   socket.join(jogador.id_sala);
    // } else if (jogadores.terceiro === undefined) {
    //   var jogador = {
    //   nome: socket.id,
    //   id_sala: "labirintoCegoSala",
    //   dono_sala: false,
    // };

    //   jogadores.terceiro = jogador;
    //   socket.join(jogador.id_sala);
    // } else {
    //   io.emit("sala_cheia");
    // }

    io.emit("jogadores", jogadores);
  });

  socket.on("disconnect", function () {
    if (jogadores.primeiro === socket.id) {
      jogadores.primeiro = undefined;
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
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
