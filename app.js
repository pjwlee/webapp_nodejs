// import modules
const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const socketid = require('socket.io');


// set up environment
const port = process.env.PORT || 3000;
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'html')));
app.use('/static', express.static(path.join(__dirname, 'css')));
app.use('/static', express.static(path.join(__dirname, 'js')));
app.use('/static', express.static(path.join(__dirname, 'img')));
app.set('port', port);


var seats = [
  [1,1,0,1,1],
  [1,1,0,1,1],
  [1,1,0,1,1]
];

// (DEPECATED !) set up a middleware
// app.use(app.router);


// main page
app.get('/', function(req, res) {
  fs.access('./static/html/main.html', function(err){
    if (err) {
      res.statusCode=404;
      res.end();
      return;
    }
    else {
      fs.readFile('./static/html/main.html', 'utf-8', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
        console.log("loaded: main");
      });
    }
  });
});


// login page
app.get('/login', function(req, res) {
	fs.access('./static/html/login.html', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./static/html/login.html', 'utf-8', function (err, dat) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(dat);
				console.log("loaded: login")
			});
		}
	});
});



// web page
app.get('/web', function(req, res) {
	fs.access('./static/html/reserve.html', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./static/html/reserve.html', 'utf-8', function (err, dat) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(dat);
				console.log("loaded: login")
			});
		}
	});
});


// admin Page
app.get('/admin', function(req, res) {
    try {
      fs.readFile('./static/html/admin.html', 'utf-8', function (err, dat) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<!doctype html>');
        res.write('<html lang="en">');
        res.write('<head>');
        res.write('<!--[if lt IE9]>');
        res.write('<script src="http:/html5shiv.googlecode.com/svn/trunk/html5.js"></script>');
        res.write('<![endif]-->');
        res.write('<!-- Required meta tags -->');                         
        res.write('<meta charset="utf-8">');
        res.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
        res.write('<meta name="description" content="node.js, demo">');
        res.write('<meta name="author" content="Paul Lee">');
        res.write('<!-- Bootstrap CSS -->');       
        res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">');             
        res.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');                  
        res.write('<style>body{padding-top: 60px;}</style>');                  
        res.write('<title>Paul\'s Demo: Main</title>');                  
        res.write('</head>');                  
        res.write('<body>');                
        res.write('<h1>under contrusction: admin site</h1>');             
        res.write('</body>');
        res.write('</html>');
        res.end();
      });
    }
  catch (err) {
    console.log(err.message);
    res.redirect('/');
  }
});	


app.get('/seats', function (req, res) {
  res.send(seats);
});



app.get('/test', function(req, res) {
	fs.access('./static/html/demo1.html', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./static/html/demo1.html', 'utf-8', function (err, dat) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(dat);
				console.log("loaded: test")
			});
		}
	});
});


// lists
app.get('/home_list', function(req, res) {
	fs.access('./static/html/home_list', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./static/html/home_list', 'utf-8', function (err, dat) {
				res.writeHead(200, {'Content-Type': 'text'});
				res.end(dat);
				console.log("loaded: home_list")
			});
		}
	});
});


// a server starts listening
var server = app.listen(app.get('port'), function() {
    console.log('app listening on port %s', port);
}); 


var io = socketid.listen(server);
// io.set('log level', 2); // not valid?


// test socket.io
io.sockets.on('connection', function (socket) {
  socket.on('reserve', function (data) {
    console.log('client sent data: ', data);
    // io.sockets.emit('smart', dat);
    seats[data.y][data.x] = 9;
    io.sockets.emit('reserve', data);
  });
});