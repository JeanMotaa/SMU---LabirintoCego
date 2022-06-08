// Importar a próxima cena
import { cena2 } from "./cena2.js";

// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

var player = {
    nome: undefined,
    id_sala: "labirintoCegoSala",
    dono_sala: undefined
}

cena1.created = function () {
  
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
    socket.emit("retorno_sucessfull");             // requisição de resposta
  });

  socket.on("unsucessfull", () => {
    socket.emit("retorno_unsucessfull");             // requisição de resposta
  });
}
