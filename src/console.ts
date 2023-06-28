import minimist from "minimist";
import chalk from "chalk";
import ProgressBar from "progress"

/**
 * 输出到命令行
 * %s  ->  字符串
 * %d  ->  数字
 * %i  ->  整数
 * %o  ->  对象
 * console.clear()  清空命令行
 */
console.log("Node.js真是一个%s的%s！",'伟大','工具')

/**
 * 从命令行接收参数
 * ts-node-esm src/serve.ts --name=serve
 * minimist: 解析并处理参数的库
 */
const argv = process.argv.slice(2)
const args = minimist(argv)
console.log('获取命令行参数：',args.name);  // serve

/**
 * 获取当前运行环境变量
 */
console.log('env:',process.env.NODE_ENV);

/**
 * .count() 计数
 */
const oranges = ['橙子', '橙子']
const apples = ['苹果']
oranges.forEach(fruit => {
    console.count('获得'+ fruit)
})
apples.forEach(fruit => {
    console.count('获得'+ fruit)
})

/**
 * console.trace() 打印堆栈调用信息
 * console.time() / timeEnd() 获取程序前后运行的时间
 */
function a() {
    console.time()
    b()
}
function b() { c() }
function c() {
    console.trace()
    console.timeEnd()
}
// a()

/**
 * 输出着色
 * `color %s reset`
 */
const bash_color = {
    'bright'    : '\x1B[1m', // 亮色
    'grey'      : '\x1B[2m', // 灰色
    'italic'    : '\x1B[3m', // 斜体
    'underline' : '\x1B[4m', // 下划线
    'reverse'   : '\x1B[7m', // 反向
    'hidden'    : '\x1B[8m', // 隐藏
    'black'     : '\x1B[30m', // 黑色
    'red'       : '\x1B[31m', // 红色
    'green'     : '\x1B[32m', // 绿色
    'yellow'    : '\x1B[33m', // 黄色
    'blue'      : '\x1B[34m', // 蓝色
    'magenta'   : '\x1B[35m', // 品红
    'cyan'      : '\x1B[36m', // 青色
    'white'     : '\x1B[37m', // 白色
    'blackBG'   : '\x1B[40m', // 背景色为黑色
    'redBG'     : '\x1B[41m', // 背景色为红色
    'greenBG'   : '\x1B[42m', // 背景色为绿色
    'yellowBG'  : '\x1B[43m', // 背景色为黄色
    'blueBG'    : '\x1B[44m', // 背景色为蓝色
    'magentaBG' : '\x1B[45m', // 背景色为品红
    'cyanBG'    : '\x1B[46m', // 背景色为青色
    'whiteBG'   : '\x1B[47m', // 背景色为白色
     reset      : '\x1B[0m',  // 重置，取消后续的修改
}
console.log('\x1B[31m%s\x1B[0m', '被着色了的文字！')

/**
 * 使用第三方库着色 chalk
 */
console.log(chalk.yellowBright('被着色了的文字！'))

/**
 * 命令行创建进度条 progress
 */
const bar = new ProgressBar(':bar',{ total: 80 })
const timer = setInterval(()=>{
    bar.tick()
    if (bar.complete) {
        clearInterval(timer)
        console.log("编译完成！")
    }
},30)

/**
 * 关闭服务
 */
setTimeout(()=>{
    process.exit()
},3000)
