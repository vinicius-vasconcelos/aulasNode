/* 
	*** FRAMEWORK EXPRESS
**

var express = require('express'); /recuperando LIB do EXPRESS
var app = express();	//executando função do EXPRESS

//rotas
app.get('/', (req, resp) =>{
	resp.send('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Portal de Notícias</h1></body></html>');
}); 

app.get('/tecnologia', (req, resp) =>{
	resp.send('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Portal de Notícias - TECNOLOGIA</h1></body></html>');
});

//escutando na porta 3000 e subindo o sevidor
app.listen(3000, function(){
	console.log('servidor rodando Express')
});
*/

/* 
	*** FRAMEWORK EJS 
**

var express = require('express'); //recuperando LIB do EXPRESS
var app = express();	//executando função do EXPRESS

app.set('view engine', 'ejs'); //mostrando pro EXPRESS que o EJS vai ser o novo motor de views

//rotas
app.get('/', (req, resp) =>{
	resp.render('home/index.ejs');
}); 

app.get('/formulario_inclusao_noticias', (req, resp) =>{
	resp.render('admin/form_add_noticia');
});

app.get('/noticias', (req, resp) =>{
	resp.render('noticias/noticias');
});

//escutando na porta 3000 e subindo o sevidor
app.listen(3000, function(){
	console.log('servidor rodando Express')
});

*/

/* 
	*** CRIANDO MÓDULOS - 1º Módulo
***/

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var msg = require('./mod_teste'); //fazendo requisição do módulo
//var msg = require('./mod_teste')(); //fazendo requisição do módulo e executando



app.listen(3000, () => {
	//console.log('run serv');
	console.log(msg())
});