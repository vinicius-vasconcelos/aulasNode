/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(3000, () => console.log('RUN SERVER...'))