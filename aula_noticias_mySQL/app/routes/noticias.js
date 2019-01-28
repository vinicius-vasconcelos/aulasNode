module.exports = app => {

	app.get('/noticia', function(req, res) {
		app.app.controllers.ctrNoticias.noticia(app, req, res);
	});

	app.get('/noticias', function(req, res) {
		app.app.controllers.ctrNoticias.noticias(app, req, res);
	});
}