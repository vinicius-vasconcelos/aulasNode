module.exports.iniciaChat = (application, req, resp) => {

	let dadosForm = req.body; //Recuperando os dados do form em json

	//Válidando os erros
	req.assert('apelido', 'Não deixar nenhum campo em branco !').notEmpty();
	req.assert('apelido', 'Campo entre 3 e 15 caracteres').len(3, 15);

	let erros = req.validationErrors(); //Verificando se há erros
	if(erros) {
		resp.render('index', {validacao: erros});
		return;
	}

	application.get('io').emit('msgCliente', {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'});

	resp.render('chat', {dadosForm: dadosForm});
}