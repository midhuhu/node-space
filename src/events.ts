import EventEmitter from "events"

const eventEmitter = new EventEmitter


eventEmitter.once('start', (num) => {
    console.log('单次执行 => 触发成功' + num)
})
eventEmitter.addListener('start', (num) => {
    console.log('触发成功' + num)
})

setTimeout(() => {
    console.log('触发1')
    eventEmitter.emit('start', 110)
}, 3000);

setTimeout(() => {
    console.log('触发2')
    eventEmitter.emit('start', 120)
}, 4000);

setTimeout(() => {
    console.log('关闭调用')
    eventEmitter.off('start', () => console.log("已关闭"))
}, 5000);