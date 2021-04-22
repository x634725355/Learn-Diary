
// 确保SimplePaller通过以下测试用例：

// 在第一次调用queryFn之前，simplePoller应该等待1秒

// 等待间隔是前一次的1.5倍，但第一次（1秒）除外

// 应该允许并发调用simplePoller，并且函数的调用不会相互干扰

// 注意：您不必在解决方案中实现queryFn和callback。你可以假设他们是被给予的。但是，simplePoller的实现应该能够毫无问题地采用queryFn和callback的不同实现，
// 并且为了实现这一点，我们鼓励您实现几个版本的queryFn和callback以进行测试。

const query = () => {
    let time = 0;

    return () => {
        time ++;
        return time >= 3;
    }
}

const queryFn = query();

const callback = () => {
    console.log("我被调用了");
}

const timeHandle = (q,c,t) => {
    setTimeout(() => {
        while (true) {
            if (q()) { return c(); }

            t = t * 1.5;
            
            timeHandle(q,c,t);
        }
    }, t)
}


const simplePoller = (queryFn, callback) => {
    let time = 1000;

    timeHandle(queryFn, callback, time);
}

simplePoller(queryFn, callback);


