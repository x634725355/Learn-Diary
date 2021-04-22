
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        // ==== 新增 ==== 
        //  executor 是一个执行器, 进入会立即执行
        //  这其中传入resolve和reject方法
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            // 如果有错误, 就直接执行 reject
            this.reject(error);
        }
    }

    // 储存状态的变量, 初始值是 pending
    status = PENDING;

    // resolve和reject为什么要用箭头函数?
    // 如果直接调用的话, 普通函数this指向的是window或者undefined
    // 用箭头函数就可以让this指向当前实例对象

    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;

    // MyPromise 类中新增
    // 存储成功回调函数
    // onFulfilledCallback = null;
    onFulfilledCallback = [];
    // 存储失败回调函数
    // onRejectedCallback = null;
    onRejectedCallback = [];

    // 更改成功后的状态
    resolve = (value) => {
        // 只有状态是等待, 才执行状态修改
        if (this.status === PENDING) {
            // 状态修改为成功
            this.status = FULFILLED;
            // 保存成功之后的值
            this.value = value;
            // ==== 新增 ====
            // 判断成功回调是否存在, 如果存在就调用
            while (this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(value);
            }
        }
    }
    // 更改失败后的状态
    reject = (reason) => {
        // 只有状态是等待, 才执行状态修改
        if (this.status === PENDING) {
            // 状态成功为失败
            this.status = REJECTED;
            // 保存失败后的原因
            this.reason = reason;
            // ==== 新增 ====
            // 判断成功回调是否存在, 如果存在就调用
            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(reason);
            }
        }
    }

    then(onFulfilled, onRejected) {
        // ==== 新增 ====
        // 为了链式调用这里直接创建了一个 MyPromise, 并在后面 return 出去
        const promise2 = new MyPromise((resolve, reject) => {
            // 这里的内容在执行器中, 会立即执行
            switch (this.status) {
                case FULFILLED:
                    // ==== 新增 ==== 
                    // 创建一个微任务等待 promise2 完成初始化
                    queueMicrotask(() => {
                        try {
                            // 获取成功回调函数的执行结果
                            const x = onFulfilled(this.value);
                            // 传入 resolvePromise 集中处理, 将 promise2 传入
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    break;
                case REJECTED:
                    queueMicrotask(() => {
                        try {
                            // 调用失败回调, 并且把原因返回
                            const x = onRejected(this.reason);
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                case PENDING:
                    // 因为不知道后面状态的变化情况, 所以将成功回调和失败回调存储起来
                    // 等到执行成功失败函数的时候再传递
                    this.onFulfilledCallback.push(() => {
                        // ==== 新增 ====
                        queueMicrotask(() => {
                            try {
                                // 获取成功回调函数的执行结果
                                const x = onFulfilled(this.value);
                                // 传入 resolvePromise 集中处理
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                    this.onRejectedCallback.push(() => {
                        // ==== 新增 ==== 
                        queueMicrotask(() => {
                            try {
                                // 调用失败回调, 并且把原因返回
                                const x = onRejected(this.reason);
                                // 传入 resolvePromise 集中处理
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });
                default:
                    break;
            }
        });

        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 如果相等了, 说明return的是自己, 抛出类型错误并返回
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 判断x是不是 MyPromise 实例对象
    if (x instanceof MyPromise) {
        // 执行 x, 调用 then 方法, 目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x)
    }
}

module.exports = MyPromise;

