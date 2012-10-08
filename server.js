//Dependencies
var express = require('express');
var fs = require('fs');
//init app
var app = express();
//load file
var web;
fs.readFile('./index.php', 'UTF-8', function(err,data) {
	if(err) throw err;
	else web = data;
});

//Create the server
app.get('/', function(req, res){
  res.send(web);
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening the port: '+port);
/*
var http = require("http");
var web;

fs.readFile('./index.php', 'UTF-8', function(err,data) {
if(error) throw err;
else web = data;
})


function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(web);
  response.end();
}

http.createServer(onRequest).listen(8888);
*/
