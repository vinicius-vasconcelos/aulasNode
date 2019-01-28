module.exports.formulario_inclusao_noticia = function(app, req, res) {
	res.render('admin/formulario_inclusao_noticia', {validacao:{}, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res) {
	let noticia = req.body;

	//validando com express-validator
	req.assert('titulo', 'Título obrigatório').notEmpty();
	req.assert('resumo', 'Resumo obrigatório').notEmpty();
	req.assert('resumo', 'Resumo deve conter entre 10 e 100 caractres').len(10, 100);
	req.assert('autor', 'Autor obrigatório').notEmpty();
	req.assert('data_noticia', 'Data obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Notícia obrigatório').notEmpty();

	var erro  = req.validationErrors();
	if(erro) {
		res.render('admin/formulario_inclusao_noticia', {validacao: erro, noticia: noticia});
		return;
	}
	
	let connection =  app.config.dbConnection(); 						//recuperar conexão
	let noticiasModel = new app.app.models.NoticiasDAO(connection); 	//recuperar model
	
	//salvar notícia
	noticiasModel.salvarNoticia(noticia, function(error, result) {
		res.redirect('/noticias');
	});
}