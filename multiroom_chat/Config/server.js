/*Importa o módulo do framework EXPRESS*/
let express = require('express');
/*Importar o módulo do CONSIGN*/
let consign = require('consign');
/*Importar o módulo do BODY-PARSER*/
let bodyParser = require('body-parser');
/*Importando o módulo do EXPRESS-VALIDATOR*/
let expressValidator = require('express-validator');

/*Iniciando OBJ do express*/
let app = express();

/*Setando variáveis 'VIEW ENGINE' e 'VIEWS' do express*/
app.set('view engine', 'ejs');
app.set('views', './App/Views');

/*Configurando o MIDDLEWARE 'express.static', 'body-parser' e 'express-validator'*/
app.use(express.static('./App/Public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

/*Configurando o CONSIGN para fazer AUTOLOAD das ROTAS, MODELS e CONTROLLERS*/
consign()
	.include('App/Routes')
	.then('App/Models')
	.then('App/Controllers')
	.into(app);

/*Exportando o obj app */
module.exports = app;