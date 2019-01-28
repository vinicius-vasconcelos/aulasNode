//criando uma classe de notícias
function NoticiasDAO(connection) {
	this.__connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback) {
	//executando consultas no db
	this.__connection.query('select * from noticias order by data_criacao desc', callback);
}

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback) {
	this.__connection.query('select * from noticias where id_noticias = ' + id_noticia.id_noticia , callback);
}

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback) {
	this.__connection.query('insert into noticias set ?', noticia, callback);
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback) {
	this.__connection.query('select * from noticias order by data_criacao desc limit 5', callback);
}

module.exports = () => NoticiasDAO