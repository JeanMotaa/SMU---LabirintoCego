// Importar a próxima cena
import { cena2 } from "./cena2.js";

// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

// Variáveis locais

var player1;
var player2;

var jogador;

var localConnection;
var remoteConnection;

cena1.created = function () {
  
   // Conectar no servidor via WebSocket
  this.socket = io();
  
  // Disparar evento quando jogador entrar na partida
  var self = this;
  var socket = this.socket;
  
  this.socket.on("jogadores",)
  if (jogadores.primeiro === )
  
  // Emitir Registro de jogadores p/ servidor
  this.socket.emit("Register", (jogadores) => {
    socket.to(socketId).emit("answer", description);
  });
