const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origins: ["https://ifsc.cloud", "https://*.gitpod.io"]
  },
});
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

    } else if (jogadores.segundo === undefined) {
      jogadores.segundo = {
        nome: sid, 
        id_sala: "labirintoCegoSala",
        dono_sala: false,
      };

      socket.join(jogadores.segundo.id_sala);
      io.to(sid).emit("register-ok", jogadores.segundo);
      console.log(jogadores.segundo);
    }
    io.emit("jogadores", jogadores);
  });
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

  // io.emit("jogadores", jogadores);
  //});

  // Sinalização de áudio: oferta
  socket.on("offer", (socketId, description) => {
    socket.to(socketId).emit("offer", socket.id, description);
  });

  // Sinalização de áudio: atendimento da oferta
  socket.on("answer", (socketId, description) => {
    socket.to(socketId).emit("answer", description);
  });

  // Sinalização de áudio: envio dos candidatos de caminho
  socket.on("candidate", (socketId, signal) => {
    socket.to(socketId).emit("candidate", signal);
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

// Abrir porta para HTTPS/WSS
app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
