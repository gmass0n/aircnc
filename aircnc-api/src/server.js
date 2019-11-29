// IMPORTS
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// CONEXÃO COM O BANCO DE DADOS
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-9vnrx.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
})

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

// PERMITE QUE QUALQUER TIPO DE APLICAÇÃO ACESSE ESSA API
app.use(cors());

// USADO PARA LER REQUISIÇÕES EM PADRÃO JSON
app.use(express.json());

// ASSIM QUE ENTRAR NA ROTA '/files', LER ARQUIVOS ESTATICOS (PDF, PNG, JPG, ETC)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// ROTAS
app.use(routes);

// PORTA ONDE SERA INICIADO A APLICAÇÃO
const port = process.env.PORT || 3333;
server.listen(port);