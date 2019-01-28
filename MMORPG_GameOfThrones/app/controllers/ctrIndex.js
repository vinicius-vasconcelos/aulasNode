module.exports.index = (application, req, res) => res.render('index', {validacao: {}, msg: ''})

module.exports.cadastro = (application, req, res) => res.render('cadastro', {validacao: {}, dadosForm: {}});

module.exports.autenticar = (application, req, res) => {
	let dadosForm = req.body;

	req.assert('usuario', 'Usuário deve ser preenchido !').notEmpty();
	req.assert('senha', 'Senha deve ser preenchido !').notEmpty();

	let erros = req.validationErrors();

	if(erros) {
		res.render('index?msg=', {validacao: erros});
		return;
	}

	/*criando método de autenticação*/
	let connection = application.config.dbConnection;
	let UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);
}