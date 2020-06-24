const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server, {origins: "http://localhost:* http://127.0.0.1:* https://welingtonfidelis.github.io/ClimaCidade-web https://welingtonfidelis.github.io/ClimaCidade-web:*"});

const connectedUsers = {};
const port = 3001;

const routes = require('./routes');

require('dotenv/config');
require('./Database/config');

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    console.log('Connected User ->', 'socket: ' + socket.id, 'user: ' + user_id);
    
    connectedUsers[user_id] = socket.id;

    socket.on('disconnect', function () {
        console.log('Disconnected User ->', 'socket: ' + socket.id, 'user: ' + user_id);
        
        delete connectedUsers[user_id];
    })
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//Aceita dados do tipo json
app.use(express.json());

//permite acesso à api de qualquer dominio 
app.use(cors());

//roteamento
app.use(routes);

server.listen(process.env.PORT || port, function () {
    console.log(`Server running in ${port}\n`);
});
