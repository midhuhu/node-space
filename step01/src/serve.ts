import * as http from 'http'
import minimist from 'minimist'

/**
 * 输出到命令行
 * %s  ->  字符串
 * %d  ->  数字
 * %i  ->  整数
 * %o  ->  对象
 * console.clear()  清空命令行
 */
console.log("Node.js真是一个%s的%s！",'伟大','工具')

const server = http.createServer( (req, res) =>{
    // statusCode 属性设置为 200，以指示成功响应
    res.statusCode = 200
    // Content-Type 标头
    res.setHeader('Content-Type', 'text/plain')
    // 关闭响应，将内容作为参数添加到 end()
    res.end('Fuck Node.js！！')
}).listen(8888)

/**
 * 获取当前运行环境变量
 * console.log('env:',process.env);
 */

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

/**
 * 从命令行接收参数
 * ts-node-esm src/serve.ts --name=serve
 * minimist: 解析并处理参数的库
 */
const argv = process.argv.slice(2)
const args = minimist(argv)
console.log('获取命令行参数：',args.name);     // serve

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


