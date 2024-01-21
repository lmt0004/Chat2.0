const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Registro de usuarios conectados
let usuariosConectados = {};

app.use(express.static('public'));

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('register', (data) => {
    console.log('Nuevo registro:', data);
    // Aquí podrías agregar lógica para manejar el registro de usuarios en tu base de datos
  });
});

io.on('connection', (socket) => {
    // Añadir el nuevo usuario al registro
    usuariosConectados[socket.id] = socket.id;
    
        // Emitir la lista actualizada de usuarios conectados, incluyendo el ID del socket propio
         // Emitir solo la lista de usuarios conectados
    io.emit('usuarios conectados', Object.keys(usuariosConectados));

        //Mensaje general
    socket.on('chat message', (msg) => {
        io.emit('chat message', { msg: msg, from: socket.id, to: null });
    });

    socket.on('private message', (data) => {
        socket.to(data.to).emit('private message', { msg: data.msg, from: socket.id, to: data.to });
        socket.emit('private message', { msg: data.msg, from: socket.id, to: data.to});
    });

    socket.on('disconnect', () => {
        // Eliminar al usuario del registro cuando se desconecte
        delete usuariosConectados[socket.id];
    
        // Notificar a todos los usuarios sobre el cambio en la lista de conectados
        io.emit('usuarios conectados', Object.keys(usuariosConectados));
  
     });
});

http.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});
