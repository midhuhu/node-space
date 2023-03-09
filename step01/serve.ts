
const  http = require('http')
console.log(http)

http.createServer( (request, response) =>{
    response.writeHead(200,{'content-type':'text/plain'})
    response.end('fuck node.js!')
    response.setHeader
}).listen(8888)

console.log('Server running at http://127.0.0.1:8888/');
