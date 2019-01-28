/*Importa as configurações do servidor*/
let app = require('./Config/server');

/*Parametrizar a porta de escuta*/
let server =  app.listen(3000, () => console.log('RUN SERVR...'));

/*Parametrizando a escuta do socket.io*/
let io = require('socket.io').listen(server);

/*Deixando IO global*/
app.set('io', io);

/*Criar uma conexão por WEBSOCKET*/
io.on('connection', socket => {
	console.log('Usuário conectado!');

	/*Executa quando o usuário desconecta*/
	socket.on('disconnect', () => console.log('Usuário desconectado !'));

	/*Servidor escutando as mensagens do cliente*/
	socket.on('msgServidor', data => {
		/*Servidor respondendo eventos de DIÁLOGO*/
		socket.emit('msgCliente', {apelido: data.apelido, mensagem: data.mensagem});
		socket.broadcast.emit('msgCliente', {apelido: data.apelido, mensagem: data.mensagem});

		/*Atualizar os participantes*/
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit('participantesCliente', {apelido: data.apelido});
			socket.broadcast.emit('participantesCliente', {apelido: data.apelido});
		}
	});
});