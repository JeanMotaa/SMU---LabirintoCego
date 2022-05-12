# SMU---LabirintoCego
Atividade de Sistemas de comunicação(Engenharia de telecomunicação), onde o desafio é fazer um jogo multiplayer usando JavaScript e protocolo de rede 

Registro do Cliente no Servidor:
CASO 1: Cliente registrando presença na sala e Servidor permitindo

Cliente: "entrar:nome:sala"
Servidor: "ok:TOKEN:codigo"

CASO 2: Cliente registrando presença na sala e Servidor não permitindo devido ao nome do usuário (incorreto ou duplicado)

Cliente: "entrar:nome:sala"
Servidor: "nok:codigo"

CASO 3: Cliente registrando presença na sala e Servidor não permitindo devido a sala estar cheia

Cliente: "entrar:nome:sala"
Servidor: "nok:codigo"

CASO 4: KeepAlive (mensagem periódica)

Cliente: "alive:TOKEN"
Servidor: "ok:codigo"

CASO 5: Conexão encerrada:

Cliente: "fim:TOKEN"
Servidor: "ok:codigo"

O que são os códigos:
200 - ok registro
201 - ok KeepAlive
202 - ok para conexão encerrada
400 - usuário duplicado
401 - usuário incorreto (com ":" ou com " ")
402 - sala cheia

Algumas definições:
Caso o jogador entre em outra sala, o mesmo terá TOKENS diferentes;
Caso o jogador perca conexão, ao entrar na sala novemente ele terá outro TOKEN;
