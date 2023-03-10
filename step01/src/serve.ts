import * as http from 'http'

const server = http.createServer( (req, res) =>{
    // statusCode 属性设置为 200，以指示成功响应
    res.statusCode = 200
    // Content-Type 标头
    res.setHeader('Content-Type', 'text/plain')
    // 关闭响应，将内容作为参数添加到 end()
    res.end('Fuck Node.js！！')
}).listen(8888)

console.log('Server running at http://127.0.0.1:8888/');

/**
 * 关闭方法二
 * 使用process.kill(process.pid, 'SIGTERM')
 */
process.on("SIGALRM",()=>{
    server.close(()=>{
        console.log("bye！，Node.js");
    })
})

setTimeout(()=>{
    /**
     * 关闭方法一
     * 默认退出代码为0
     * 可以设置退出代码为2  =>  process.exit(2)
     * process.exitCode = 2
     * 任何当前待处理或正在运行的请求都将被中止，这并不好！
     */
    process.exit()
},3000)
