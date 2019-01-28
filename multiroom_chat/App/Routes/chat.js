/*Exportando a rota do CHAT*/
module.exports = application => {
	application.get('/chat', (req, resp) => application.App.Controllers.ctrChat.iniciaChat(application, req, resp));
	application.post('/chat', (req, resp) => application.App.Controllers.ctrChat.iniciaChat(application, req, resp));
}