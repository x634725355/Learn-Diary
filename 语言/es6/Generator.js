{
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  let hw = helloWorldGenerator();

  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());

  const myIterable = {};

  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  console.log([...myIterable]);
}

// next 函数带参数
{
  function* f() {
    for (let i = 0; true; i++) {
      let reset = yield i;
      if (reset) { i = -1; }
    }
  }

  let g = f();

  console.log(g.next());
  console.log(g.next());
  console.log(g.next(true));

  function* foo(x) {
    let y = 2 * (yield (x + 1));
    let z = yield (y / 3);
    return (x + y + z);
  }

  let a = foo(5);
  // console.log(a.next());
  // console.log(a.next()); // NaN
  // console.log(a.next()); // NaN

  console.log(a.next());
  console.log(a.next(12)); // { value: 8, done: false }
  console.log(a.next(13)); // { value: 42, done: true }
}

{
  // 直观展示next方法 next代表上一个yield表达式的返回值
  function* dataConsumer() {
    console.log('Started');
    console.log(`1, ${yield}`);
    console.log(`2, ${yield}`);
    return 'result';
  }

  let genObj = dataConsumer();

  genObj.next(); // Started
  genObj.next('momo'); // 1. momo
  genObj.next('kaka'); // 2. kaka
}

// 斐波那契数列
{
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (; ;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  for (let n of fibonacci()) {
    if (n > 1000) break;
    console.log("斐波那契", n);
  }
}

// 抛出错误 Generator.prototype.throw()
{
  let g = function* () {
    while (true) {
      try {
        yield
      } catch (error) {
        if (error != 'a') throw error;
        console.log('内部捕获', error);
      }
    }
  }

  let i = g();
  i.next();
  i.throw("a");

  try{
    throw new Error('a');
    throw new Error('b');
  } catch (error) {
    console.log('外部捕获', error);
  }

}

// 立即结束 Generator.prototype.return() 
{
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  let g = gen();
  
  console.log(g.next());
  console.log(g.return('foo')); // 到此停止
  console.log(g.next());

  function* numbers() {
    yield 1;
    try {
      yield 2;
      yield 3;
    } finally {
      yield 4;
      yield 5;
    }
    yield 6;
  }

  let k = numbers();
  console.log(k.next());
  console.log(k.next());
  console.log(k.return(7));
  console.log(k.next());
  console.log(k.next());

}

{
  // TODO: 7. yield* 表达式
  function* foo() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
  }

  function* bar() {
    yield 'x';
    for (let v of foo()) {
      yield v;
    }
    yield 'y';
  }

  for (let v of bar()) {
    console.log(v);
  }

  function* getFuncWithReturn() {
    yield 'a';
    yield 'b';

    return 'The result';
  }
  
  function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
  }

  console.log([...logReturned(getFuncWithReturn())]);

}


