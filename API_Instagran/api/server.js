/*
	*** Configurando o servidor
*/

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;
const multipart = require('connect-multiparty');
const fs = require('fs');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multipart());

//configurando o response de preflight
app.use((req, res, next) => {

	//habilitando API para respoder a um domínio
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	//configura os métodos que a origem pode requisitar
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	//habilita a reescrição de cabeçalhos
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

const port = 8080;

app.listen(port);

console.log('RUN SERVER... PORT ' + port);

/*
	*** Configurando o baco de dados
*/
let db = new mongodb.Db(
	'instagram',
	new mongodb.Server('localhost', 27017, {}),
	{}
);


/*
	*** Configurando as rotas
*/

//recuperando via GET a raiz da api
app.get('/', (req, res) => res.send({msg: 'Olá'}));

//salvando no banco via POST
app.post('/api', (req, res) => {

	let time_stamp = new Date().getTime();
	let url_imagem = time_stamp + '_' + req.files.arquivo.originalFilename;


	let path_origem = req.files.arquivo.path;
	let path_destino = './uploads/' + url_imagem;

	fs.rename(path_origem, path_destino, err => {
		if(err){
			res.status(500).json({error: err});
			return;
		}

		//json da img
		let dados = {
			url_imagem: url_imagem,
			titulo: req.body.titulo
		}

		//persistindo em bd
		db.open((err, mongoClient) => {
			mongoClient.collection('postagens', (err, collection) => {
				collection.insert(dados, (err, records) => {
					if(err)
						res.status(500).json({status: 'erro'});
					else
						res.status(200).json({status: 'sucesso'});

					mongoClient.close();
				});
			});
		});
	});
});

//recuperando todos os doc do banco via GET
app.get('/api', (req, res) => {

	db.open((err, mongoClient) => {
		mongoClient.collection('postagens', (err, collection) => {
			collection.find().toArray((err, result) => {
				if(err)
					res.status(404).json(err);
				else
					res.status(200).json(result);
			});
			mongoClient.close();
		});
	});
});

app.get('/imagens/:imagem', (req, res) => {
	let img = req.params.imagem;

	fs.readFile('./uploads/' + img, (err, content) => {
		if(err) {
			res.status(400).json(err);
			return;
		}

		res.writeHead(200, {'content-type': 'image/jpg'});
		res.end(content);
	});
});

//recuperando doc por ID
app.get('/api/:_id', (req, res) =>{ 

	db.open((err, mongoClient) => {
		mongoClient.collection('postagens', (err, collection) => {
			collection.find(objectId(req.params._id)).toArray((err, result) => {
				if(err)
					res.status(404).json(err);
				else
					res.status(200).json(result);
			});
			mongoClient.close();
		});
	});
});

//atualizando doc já inseridos
app.put('/api/:_id', (req, res) => {

	db.open((err, mongoClient) => {
		mongoClient.collection('postagens', (err, collection) => {
			collection.update(
				{_id: objectId(req.params._id)},
				{$push: {comentarios: {id_comentario: new objectId(), comentario: req.body.comentario}}},
				{},
				(err, records) => {
					if(err)
						res.status(500).json(err);
					else
						res.status(200).json(records);
				}
			);
			mongoClient.close();
		});
	});
});

//deletando um doc
app.delete('/api/:_id', (req, res) => { 

	db.open((err, mongoClient) => {
		mongoClient.collection('postagens', (err, collection) => {
			collection.update(
				{},
				{$pull: {comentarios: {id_comentario: objectId(req.params._id)}}},
				{multi: true},
				(err, records) => {
					if(err)
						res.status(500).json(err);
					else
						res.status(200).json(records);
				}
			);
			mongoClient.close();
		});
	});
});