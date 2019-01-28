module.exports = application => {

	application.post('/cadastrar', (req, res) => application.app.controllers.ctrCadastro.cadastrar(application, req, res));

	application.get('/voltar_index', (req, res) => application.app.controllers.ctrCadastro.voltarIndex(application, req, res));
}