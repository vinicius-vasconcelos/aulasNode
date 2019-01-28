/* 
	*** PRIMEIRO PROGRAMA COM NODE.JS
** 

var http = require('http');

http.createServer(function(req, resp) {
	var categoria = req.url; //pega apenas as requisições da url

	//rotas
	if(categoria == '/tecnologia')
		resp.end('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Tecnologia</h1></body></html>');
	else if(categoria == '/moda')
		resp.end('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Moda</h1></body></html>');
	else if(categoria == '/esporte')
		resp.end('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Esporte</h1></body></html>');
	else
		resp.end('<html><head><title>Portal Notícias</title><meta charset="utf-8"></head><body><h1>Portal Notícias - Default</h1></body></html>');

}).listen(3000);
*/