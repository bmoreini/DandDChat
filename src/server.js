console.log("running");
const http = require('http');
const express = require('express');
const path = require('path');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app=express();
app.disable('x-powered-by');

app.get(/^(.+)$/, (request, response) => {
	response.sendFile(request.params[0], { root: path.join(__dirname, '../client') });
});

const server = http.createServer(app);
server.listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);

const onDisconnect = (sock) => {
  const socket = sock;
  socket.on('disconnect', () => {
    console.log(`${socket.id} Left room1`);
    socket.leave('room1');
  });
};

const onJoined = (sock) => {
	const socket = sock;
	socket.on('join', () => {
		socket.join('room1');
		console.log(`${socket.id} joined room1`);
	});
};

const chatRequest = (sock) => {
	const socket = sock;
	socket.on('chatRequest', (data) => {
		console.log(data);
		io.sockets.in('room1').emit("chatBack",data);
	});

}
// pass in the http server into socketio and grab the websocket server as io
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
	onJoined(socket);
	chatRequest(socket);
	onDisconnect(socket);
});