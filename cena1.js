// Criar a cena 1
var cena1 = new Phaser.Scene("Cena 1");

var socket;
var ice_servers = {
  // publicando servidor em endereço remoto https
  iceServers: [
    {
      urls: "stun:ifsc.cloud",
    },
    {
      urls: "turns:ifsc.cloud",
      username: "smu20221",
      credential: "smu20221",
    },
  ],
};
var player = {
  nome: undefined,
  id_sala: "labirintoCegoSala",
  dono_sala: undefined,
};
var midias;
var localConnection;
var remoteConnection;
const audio = document.querySelector("audio");

cena1.preload = function () {};

cena1.create = function () {
  // conectando no servidor via webSocket
  socket = io(("/", { path: "/irla-jean/" }));    // conexão por socket.io por meio da subpasta
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
    if (jogadores.primeiro.nome == socket.id) {
      // primeiro jogador
      player = 1;
      // então faz a requisição de troca de midia
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo.nome === socket.id) {
      player = 2;

      // sinaliza uma oferta de mídia para primeiro jogador
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              socket.emit("candidate", jogadores.primeiro.nome, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro.nome,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));
    }

    console.log(jogadores);
  });

  socket.on("sala_cheia", () => {
    socket.emit("retorno_sala"); // requisição de resposta
    dono_sala: undefined;
  });

  // após a sala cheia, emitir um "offer" de mídia entre as pessoas que já estão dentro da sala
  // resposta a sinalização de oferta de mídia
  // about:webrtc para visualizar melhor a troca de mensagens

  // resposta a offer de midia
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
