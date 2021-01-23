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


{
  // TODO: 9. Generator 函数的this

  // 那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？
  function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }

  let obj = {};
  let f = F.call(F.prototype);

  f.next();
  f.next();
  f.next();

  console.log(f.a); // 1
  console.log(f.b); // 2
  console.log(f.c); // 3

}

{
  // TODO: 10. Generator 与状态机
  let ticking = true;
  let clock = function() {
    if (ticking) 
      console.log("Tick!");
    else 
      console.log("Tock!");
    ticking = !ticking;
  }

  // 如果使用Generator实现, 如下
  let clock1 = function* () {
    while(true) {
      console.log('Tick!');
      yield;
      console.log('Tock!');
      yield;
    }
  }

  let momo = clock1();
  momo.next();
  momo.next();
  momo.next();
  momo.next();

}

{
  // TODO: 11. Generator 应用

  // function* main() {
  //   let result = yield request("http://localhost:3000/search?keywords=海阔天空");
  //   let resp = JSON.parse(result);
  //   console.log(resp.value);
  // }

  // function request(url) {
  //   fetch(url).then((response) => {
  //     it.next(response);
  //   })
  // }

  // var it = main();
  // it.next();
}


