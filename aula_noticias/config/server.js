var app = require('express')();
app.set('view engine', 'ejs');
app.set('views', './app/views'); //apontando para onde esta as VIEWS

module.exports = app;