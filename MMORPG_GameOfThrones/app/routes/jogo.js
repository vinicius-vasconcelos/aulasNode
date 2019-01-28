module.exports = application => {
	application.get('/jogo', (req, res) => application.app.controllers.ctrJogo.jogo(application, req, res));
	application.get('/sair', (req, res) => application.app.controllers.ctrJogo.sair(application, req, res));
	application.get('/suditos', (req, res) => application.app.controllers.ctrJogo.suditos(application, req, res));
	application.get('/pergaminhos', (req, res) => application.app.controllers.ctrJogo.pergaminhos(application, req, res));
	application.post('/ordenar_acao_sudito', (req, res) => application.app.controllers.ctrJogo.ordenar_acao_sudito(application, req, res));
	application.get('/revogar_acao', (req, res) => application.app.controllers.ctrJogo.revogar_acao(application, req, res));
}