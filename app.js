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


// reservation page
app.get('/reserv', function(req, res) {
	fs.access('./static/html/reserve.html', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./static/html/reserve.html', 'utf-8', function (err, dat) {
				// res.writeHead(200, {'Content-Type': 'text/html'});
        // res.end(dat);
        res.send(dat.toString());
				console.log("loaded: reservation")
			});
		}
	});
});


var seats = [
  [1,1,0,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,0,1,1]
];


app.get('/seat', function (req, res) {
  res.send(seats);
});



// a server starts listening
var server = app.listen(app.get('port'), function() {
    console.log('app listening on port %s', port);
}); 


var io = socketid.listen(server);
// io.set('log level', 2); // not valid?


// test socket.io
io.sockets.on('connection', function (socket) {
  socket.on('reserve', function (dat) {
    console.log('client sent data: ', dat);
    // io.sockets.emit('smart', dat);
    seats[dat.y][dat.x] = 9;
    io.sockets.emit('reserve',dat);
  });
});