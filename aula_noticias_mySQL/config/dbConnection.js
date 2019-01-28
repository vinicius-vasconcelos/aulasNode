var mysql = require('mysql'); //requisitando o mysql

//criando conexão com o banco
var connMYSQL = function() {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'portal_noticias'
	});
}


module.exports = () => connMYSQL;