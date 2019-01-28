let ObjectID = require('mongodb').ObjectId;

function JogoDAO(conncetion) {
	this._connection = conncetion();
}

JogoDAO.prototype.gerarParametros = function(usuario) {

	this._connection.open((err, mongoClient) => {

		mongoClient.collection('jogo', (err, collection) => {

			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});
			mongoClient.close();
		});
	});
} 

JogoDAO.prototype.iniciaJogo = function (res, usuario, casa, msg) {
	
	this._connection.open((err, mongoClient) => {

		mongoClient.collection('jogo', (err, collection) => {

			collection.find({usuario: usuario}).toArray((err, arr) => {
				res.render('jogo', {
					img_casa: casa, 
					jogo: arr[0],
					msg: msg
				});
				mongoClient.close();
			});
			
		});
	});
}

JogoDAO.prototype.acao = function(acao) {
	this._connection.open((err, mongoClient) => {

		mongoClient.collection('acao', (err, collection) => {

			let tempo = null;

			switch (parseInt(acao.acao)) {
				case 1:
					tempo = 1 * 60 * 60000;
				break;

				case 2:
					tempo = 2 * 60 * 60000;
				break;

				case 3:
					tempo = 5 * 60 * 60000;
				break;

				case 4:
					tempo = 5 * 60 * 60000;
				break;
			}

			acao.acao_termina_em = new Date().getTime() + tempo;
			collection.insert(acao);
		});

		mongoClient.collection('jogo', (err, collection) => {
			let moedas = null;

			switch (parseInt(acao.acao)) {
				case 1:
					moedas = -2 * acao.quantidade;
				break;

				case 2:
					moedas = -3 * acao.quantidade;
				break;

				case 3:
					moedas = -1 * acao.quantidade;
				break;

				case 4:
					moedas = -1 * acao.quantidade;
				break;
			}

			collection.update({usuario: acao.usuario}, {$inc: {moeda: moedas}});
			mongoClient.close();
		});
	});
}

JogoDAO.prototype.getAcoes = function(usuario, res) {
	this._connection.open((err, mongoClient) => {

		mongoClient.collection('acao', (err, collection) => {

			collection.find({
					usuario: usuario, 
					acao_termina_em: {$gt: new Date().getTime()}
				}).toArray((err, arr) => {
					res.render('pergaminhos', {acoes: arr});
					mongoClient.close();
			});
		});
	});
}

JogoDAO.prototype.revogarAcao = function(_id, res) {

	this._connection.open((err, mongoClient) => {

		mongoClient.collection('acao', (err, collection) => {

			collection.remove({_id: ObjectID(_id)}, (err, result) =>{
				res.redirect('jogo?msg=D');
				mongoClient.close();
			});

		});
	});
}

module.exports = () => JogoDAO;