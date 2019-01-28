/*Exportando as ROTAS da minha aplicação*/
module.exports = application => {
	application.get('/', (req, resp) => application.App.Controllers.ctrIndex.home(application, req, resp));
}