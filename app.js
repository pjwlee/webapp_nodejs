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


// login page
app.get('/', function (req, res) {
  res.send('hello world');
  res.end();
})


// a server starts listening
app.listen(app.get('port'), function() {
    console.log('app listening on port %s', port);
});