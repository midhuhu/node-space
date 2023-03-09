
import * as http from 'http'

http.createServer( (req, res) =>{
    // statusCode 属性设置为 200，以指示成功响应
    res.statusCode = 200
    // Content-Type 标头
    res.setHeader('Content-Type', 'text/plain')
    // 关闭响应，将内容作为参数添加到 end()
    res.end('Fuck Node.js！！')
}).listen(8888)

console.log('Server running at http://127.0.0.1:8888/');
