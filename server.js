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
