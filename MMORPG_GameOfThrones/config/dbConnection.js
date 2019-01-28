/* importar o mongodb */
let mongo = require('mongodb');

let connMongoDB = () => {
	
	let db = new mongo.Db(
		'got',
		new mongo.Server(
			'localhost', 	//string contendo o endereço do servidor
			27017, 			//porta de conexão
			{}
		),
		{}
	);

	return db;
}

module.exports = () => connMongoDB
