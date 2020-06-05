// import modules
var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');


// set up environment
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);


// main page
app.get('/', function(req, res) {
  fs.access('./main.html', function(err){
    if (err) {
      res.statusCode=404;
      res.end();
      return;
    }
    else {
      fs.readFile('./main.html', 'utf-8', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
        console.log("loaded: main");
      });
    }
  });
});


// login page
app.get('/login', function(req, res) {
	fs.access('./login.html', function(err){
		if (err) {
			res.statusCode=404;
			res.end();
			return;
		}
		else {
			fs.readFile('./login.html', 'utf-8', function (err, dat) {
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
      fs.readFile('./admin.html', 'utf-8', function (err, dat) {
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


// a server starts listening
app.listen(app.get('port'), function() {
    console.log('app listening on port %s', port);
});