let app = require('./config/server');

/*let rotaHome = require('./app/routes/home')(app);
let rotaNoticias = require('./app/routes/noticias')(app);
let rotaForm = require('./app/routes/formulario_inclusao_noticia')(app);*/

app.listen(3000, function(){
	console.log('RUN SERVER...')
});