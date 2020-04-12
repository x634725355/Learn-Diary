/* 
    events事件是node里面的事件触发器
    通过类继承方法 然后new 出事件 实例
    on('事件名', 触发的事件函数) 代表绑定事件 once('事件名', 触发的事件函数)绑定的事件只会触发一次
    emit('事件名')代表触发的事件
*/

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('触发事件');
});
myEmitter.emit('event');
myEmitter.emit('event');