
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(bodyParser.urlencoded({extended: true}));	//incluindo o bodyparser
app.use(expressValidator());						//incluindo o express-validator
app.use(express.static('./app/public'));				//incluindo arquivos estáticos

consign()
	.include('app/routes')				//autoload rotas
	.then('config/dbConnection.js')		//autoload conexão bd
	.then('app/models')					//autoload models
	.then('app/controllers')			//autoload ctr
	.into(app); 

module.exports = app;