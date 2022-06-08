// Importar a próxima cena
import { cena2 } from "./cena2.js";

// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

// Variáveis locais
var player1;
var player2;

var jogador;

cena1.created = function () {
  
  // Conectar no servidor via WebSocket
  socket = io();
  
  // Disparar evento quando jogador entrar na partida
  // var self = this;
  // var socket = this.socket;
  
  // Definindo jogadores 
  socket.on("jogadores", (jogadores))
  if (jogadores.primeiro === socket.id) {
    jogador = 1;

  } else if (jogadores.segundo === socket.id) {
    jogador = 2;

  }  else if (jogadores.terceiro === socket.id) {
    jogador = 3;

  } else {
     //socket.emit(“message: duplicate user”, 
                 // “status: 401”)
  }

  // Emitir Registro de jogadores p/ servidor
  this.socket.emit("Register", (jogadores) => {
    if (jogador === 1) {
      //criar sala

    } else if (jogador === 2) {
      // recebe convite para entrar na sala

    } else if (jogador === 3) {
      // recebe convite para entrar na sala
      // iniciar o jogo

    } else   // Quando todos os jogadores estão conectados
      (jogadores.primeiro !== undefined && jogadores.segundo !== undefined && jogadores.terceiro !== undefined) {
        // sala cheia, ngm pode entrar
        // “message:  “crowded room”,
        // “status: 403”
        };
    }
  }
