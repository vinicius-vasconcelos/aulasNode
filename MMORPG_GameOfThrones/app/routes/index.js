module.exports = application => {
	application.get('/', (req, res) => application.app.controllers.ctrIndex.index(application, req, res));

	application.post('/autenticar', (req,res) => application.app.controllers.ctrIndex.autenticar(application, req, res));

	application.get('/cadastro', (req, res) => application.app.controllers.ctrIndex.cadastro(application, req, res));
}