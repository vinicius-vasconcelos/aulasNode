module.exports.noticia = function(app, req, res) {
	let connection = app.config.dbConnection();
	let noticiaModel = new app.app.models.NoticiasDAO(connection);

	noticiaModel.getNoticia(req.query, (error, result) => res.render('noticias/noticia', {noticia: result}));	
}

module.exports.noticias = function(app, req, res) {
	let connection =  app.config.dbConnection();//executando a função
	let noticiasModel = new app.app.models.NoticiasDAO(connection);

	noticiasModel.getNoticias((error, result) => res.render('noticias/noticias', {noticias: result}));
}