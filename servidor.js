const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origins: [
      "https://labirinto.ifsc.cloud",
      "https://*.gitpod.io"
    ],
  },
});
const PORT = process.env.PORT || 3000;

var jogadores = {
  primeiro: undefined,
  segundo: undefined,
  terceiro: undefined,
};

// Dispara evento quando jogadores entrarem na partida
io.on("connection", function (socket) {
    if (jogadores.primeiro === undefined) {

      var jogador = {
        nome: socket.id,
        id_sala: "labirintoCegoSala",
        dono_sala: true
      }

      jogadores.primeiro = jogador;
      socket.join(jogador.id_sala);       // criando a sala, dono: primeiro a entrar
      
      io.emit("created room", jogador);

  } else if (jogadores.segundo === undefined) {
    
    var jogador = {
      nome: socket.id,
      id_sala: "labirintoCegoSala",
      dono_sala: false
    }

    jogadores.segundo = jogador;
    // se jogador possui o acesso a sala, entra na partida 
    socket.join(jogador.id_sala);

  } else if (jogadores.terceiro === undefined) {

    var jogador = {
      nome: socket.id,
      id_sala: "labirintoCegoSala",
      dono_sala: false
    }

    jogadores.terceiro = jogador;
    // se jogador possui o acesso a sala, entra na partida 
    socket.join(jogador.id_sala);

  } else {
    // sala cheia
    io.emit("sala_cheia");
  }

  io.emit("jogadores", jogadores)         // lista de jogadores enviada p geral
  console.log("+Lista de jogadores: %s", jogadores);

  socket.on("retorno_sala_cheia", () => {              // resposta do emit feito no cliente --> 
    console.log("status: 403")
  });

  socket.on("retorno_sucessfull", () => {              // resposta do emit feito no cliente --> 
    console.log("status: 200")
  });

  socket.on("retorno_unsucessfull", () => {              // resposta do emit feito no cliente --> 
    console.log("status: 401")
  });
  
  // Sinalização de áudio: oferta
  socket.on("offer", (socketId, description) => {
    socket.to(socketId).emit("offer", socket.id, description);
  });

  // Sinalização de áudio: atendimento da oferta
  socket.on("answer", (socketId, description) => {
    socket.to(socketId).emit("answer", description);
  });

  //Sinalização de áudio: envio dos candidatos de caminho
  socket.on("candidate", (socketId, signal) => {
    socket.to(socketId).emit("candidate", signal);
  });

  // Disparar evento quando jogador sair da partida
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
  
  socket.on("")
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
