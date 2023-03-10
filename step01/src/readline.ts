import * as readline from 'readline';
/**
 * 从命令行读取输入
 * readline <简单，淘汰>
 * Inquirer.js <功能完整>
 */

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

read.question('你掉的是这把金斧头，还是这把银斧头？',(res)=>{
    console.log('你确定是' + res + '?');
    read.close()
})

