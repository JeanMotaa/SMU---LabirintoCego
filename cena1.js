// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

var socket;
var ice_servers = {   // publicando servidor em endereço remoto https
  iceServers: [
    {
      urls: "stun:ifsc.cloud",
    },
    {
      urls: "turns:ifsc.cloud",
      username: "etorresini",
      credential: "matrix",
    },
  ],
};
var player = {
  nome: undefined,
  id_sala: "labirintoCegoSala",
  dono_sala: undefined,
};
var midias;

cena1.preload = function () {};

cena1.create = function () {

  // conectando no servidor vai webSocket
  socket = io(("/", { path: "/irla-jean/" }));    // conexão por socket.io por meio da subpasta

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

  // resposta a sinalização de oferta de mídia
    socket.on("offer", (socketId, description) => {
      remoteConnection = new RTCPeerConnection(ice_servers);
      midias
        .getTracks()
        .forEach((track) => remoteConnection.addTrack(track, midias));
      remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && socket.emit("candidate", socketId, candidate);
      };
      remoteConnection.ontrack = ({ streams: [midias] }) => {
        audio.srcObject = midias;
      };
      remoteConnection
        .setRemoteDescription(description)
        .then(() => remoteConnection.createAnswer())
        .then((answer) => remoteConnection.setLocalDescription(answer))
        .then(() => {
          socket.emit("answer", socketId, remoteConnection.localDescription);
        });
    });

    socket.on("answer", (description) => {
      localConnection.setRemoteDescription(description);
    });

    socket.on("candidate", (candidate) => {
      const conn = localConnection || remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });
};

cena1.update = function () {};

export { cena1 };
