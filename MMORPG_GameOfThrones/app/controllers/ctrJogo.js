function validaSessao(req, res) {
	if(!req.session.autorizado){
		res.render('index', {validacao: {}});
		return;
	}
}


module.exports.jogo = (application, req, res) => {
	
	validaSessao(req, res);

	let msg = ''
	if(req.query.msg != '')
		msg = req.query.msg;


	let connection = application.config.dbConnection;
	let JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
}

module.exports.sair = (application, req, res) => {
	validaSessao(req, res);
	req.session.destroy(err => res.render('index', {validacao: {}, msg: ''}));
}

module.exports.suditos = (application, req, res) => {
	validaSessao(req, res);
	res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = (application, req, res) => {
	validaSessao(req, res);

	/*Recuperar ações inseridas no banco de dados*/
	let connection = application.config.dbConnection;
	let JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.getAcoes(req.session.usuario, res);
}

module.exports.ordenar_acao_sudito = (application, req, res) => {
	validaSessao(req, res);

	let dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	let erros = req.validationErrors();

	if(erros) {
		res.redirect('jogo?msg=A');
		return;
	}

	let connection = application.config.dbConnection;
	let JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;
	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=B')
}

module.exports.revogar_acao = (application, req, res) => {

	let connection = application.config.dbConnection;
	let JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.revogarAcao(req.query.id_acao, res);
}