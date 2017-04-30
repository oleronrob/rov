var http = require('http');
var five = require('johnny-five');
var fs = require('fs');
var board = new five.Board();

board.on("ready", function() {
  // Create two servos, on pins 9 and 10
var servo1 = new five.Servo(10);
servo1.to(90);
var servo2 = new five.Servo(11);
servo2.to(90);
var servo3 = new five.Servo(12);
servo3.to(90);
// Loading the file index.html displayed to the client

var server = http.createServer(function(req, res) {

    fs.readFile('./index033.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});


// Loading socket.io

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket, username) {
	
	


	

    // When the client connects, they are sent a message

    socket.emit('message', 'You are connected!');

    // The other clients are told that someone new has arrived

    socket.broadcast.emit('message', 'Another client has just connected!');


    // As soon as the username is received, it's stored as a session variable

    socket.on('little_newbie', function(username) {

        socket.username = username;

    });


    // When a "message" is received (click on the button), it's logged in the console

    socket.on('message', function (message) {

        // The username of the person who clicked is retrieved from the session variables
			if (message ==="motavance") {
				speed +=4;
			servo.to(speed);} else {
				console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
			}
    }); 
	
	//moteurs
	socket.on('moteur1', function (speed1) {
		
		console.log(speed1);
		servo1.to(speed1);
		});
	socket.on('moteur2', function (speed2) {
		
		console.log(speed2);
		servo2.to(speed2);
		});
	socket.on('moteur3', function (speed3) {
		
		console.log(speed3);
		servo3.to(speed3);
		});	
		
	socket.on('moteurstop', function (speed) {
		speed=90;
		servo1.to(speed);
		servo2.to(speed);
		servo3.to(speed);
		console.log(speed);
		
		});

});



server.listen(8080);});