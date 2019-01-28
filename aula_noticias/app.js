var app = require('./config/server');

let home = require('./app/routes/home')(app);
let rotaNoticias = require('./app/routes/noticias')(app);
let formulario = require('./app/routes/formulario_inclusao_noticia')(app);

app.listen(3000, ()=> console.log('Run server...'));