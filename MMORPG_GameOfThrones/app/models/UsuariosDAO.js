/*importar o módulo do crypto*/
const cryptoMD5 = require('crypto');

function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {

	usuario.senha = cryptoMD5.createHash('md5').update(usuario.senha).digest('hex');

	this._connection.open((err, mongoclient) => {

		mongoclient.collection('usuarios', (err, collection) => {

			collection.insert(usuario);
			mongoclient.close();
		});
	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {

	usuario.senha = cryptoMD5.createHash('md5').update(usuario.senha).digest('hex');

	this._connection.open((err, mongoclient) => {

		mongoclient.collection('usuarios', (err, collection) => {

			collection.find(usuario).toArray((err, arr) => {
				if(arr[0] != undefined) {
					req.session.usuario = arr[0].usuario;
					req.session.casa = arr[0].casa;

					req.session.autorizado = true;
				}

				if(req.session.autorizado)
					res.redirect('jogo');
				else
					res.render('index', {validacao:{}});
			});
			mongoclient.close();
		});
	});
}

module.exports = () => UsuariosDAO;