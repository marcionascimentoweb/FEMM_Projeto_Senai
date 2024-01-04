//Utilizar o express
let express = require('express');
let app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let bodyParser = require('body-parser');
// Configura para ler dados do POST por form-urlencoded e application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));


app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Codingpedia, Authorization');
    next();
  });

//Rotas
app.use('/api/livros', require('./routes/livro'));

//Teste de Erro
app.get('/teste_error', function(req, res){
    throw Error('Erro Ninja');
});

//Rota não encontrado '404'
app.use(function(req, res, next){
    res.status(404);
    res.json({ err: "Não encontrado"});
});

//Rota genérica de erro '500'
app.use(function(err, req, res, next){
    //Imprime a stacktrace do erro no console para debug
    console.error(err)
    res.status(500);
    res.json({ erro: 'Erro na transação '});
});

//inicia o servidor
let server = app.listen(3000, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});