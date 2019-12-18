let socket = {};

const connectSocket = () => {
	socket = io.connect();
	socket.on('connect', () => {
		console.log('connecting to server');
		socket.emit('join', {});
	});
	socket.on("chatBack", (data) => {
		console.log(data);
		document.querySelector("#chatlog").value+=data;
	});

	socket.on('disconnect', () => {
		console.log('disconnected from server');
	});
};

function chatRequest(event){
	console.log("chat sent");
	socket.emit('chatRequest',document.querySelector("#chatbox").value);
}


// Purpose of lines 22-24 is to connect to button
const init = () => {
	console.log("Init started....");
	connectSocket();
	const selectButton = document.querySelector("#send");
	console.log(selectButton);
	//document.querySelector("#send").addEventListener('click',chatRequest;
}

window.onload=init();

