// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

var socket;
var player = {
  nome: undefined,
  id_sala: "labirintoCegoSala",
  dono_sala: undefined,
};

cena1.preload = function () {};

cena1.create = function () {
  socket = io();

  socket.on("connect", () => {
    socket.emit("register", socket.id);
  });

  socket.on("register-ok", (jogador) => {
    player = jogador;
    console.log("Player was chosen: ", jogador.nome);
  });

  socket.on("register-nok", () => {});

  socket.on("jogadores", (jogadores) => {
    console.log(jogadores);
  });

  socket.on("sala_cheia", () => {
    socket.emit("retorno_sala"); // requisição de resposta
    dono_sala: undefined;
  });
};

cena1.update = function () {};

export { cena1 };
