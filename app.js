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


// the login page
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
        console.log("loaded: login");
      });
    }
  });
});


// a server starts listening
app.listen(app.get('port'), function() {
    console.log('app listening on port %s', port);
});