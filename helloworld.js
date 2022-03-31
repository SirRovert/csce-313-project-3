var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200, {'content-type':'text/plain'});
    res.end('Hello World!');
}).listen(9001);

console.log('Server is running on a port over 9000!');