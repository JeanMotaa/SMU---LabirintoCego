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
  dono_sala: undefined
}

cena1.preload = function () { }

cena1.create = function () {

  // Conectar no servidor via WebSocket
  socket = io();

  // Disparar evento quando jogador entrar na partida
  // var self = this;
  // var socket = this.socket;

  // Definindo jogadores 
  socket.on("Register jogadores", (jogador) => {

    player.nome = jogador.nome;
    player.dono_sala = jogador.dono_sala;
    console.log("Player was chosen", jogador);
  })

  socket.on("sala_cheia", () => {
    socket.emit("retorno_sala");             // requisição de resposta
  });

  socket.on("sucessfull", () => {
    socket.emit("retorno_sucessfull"); // requisição de resposta
  });

  socket.on("unsucessfull", () => {
    socket.emit("retorno_unsucessfull"); // requisição de resposta
  });
};

cena1.update = function () {};

export { cena1 };

