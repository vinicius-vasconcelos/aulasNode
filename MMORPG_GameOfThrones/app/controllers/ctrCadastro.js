module.exports.voltarIndex = (application, req, res) => res.render('index', {validacao: {}});

module.exports.cadastrar = (application, req, res) => {

	let dadosForm = req.body;

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	/*Criando instância do BANCO*/
	let connection = application.config.dbConnection;

	/*Inclusão do usuário*/
	let UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	UsuariosDAO.inserirUsuario(dadosForm);

	/*Geração das habilidades*/
	let JogoDAO =  new application.app.models.JogoDAO(connection);
	JogoDAO.gerarParametros(dadosForm.usuario);

	/*Gerando sessão e redirecionando para a página do jogo*/
	req.session.usuario = dadosForm.usuario;
	req.session.casa = dadosForm.casa;
	req.session.autorizado = true;

	res.render('index', {validacao: {}, msg: 'Cadastro realizado com sucesso !'});
}