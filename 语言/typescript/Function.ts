// 定义返回值
{
  function animal(name: string, age: number): string {
    return name + age;
  }

  console.log(animal("momo", 10));
}

// 如果一个函数没有返回值 则将其定义为空类型
{
  function sayHello(): void {
    console.log("hello world");
  }
}

// never 指 一个函数永远也执行不完
function errorFuntion(): never {
  // 第一种抛出了异常
  throw new Error("这个错我就犯了");
  console.log("hello world");
}

function forNever(): never {
  // 第二种一直死循环
  while (true) {}
  console.log("一直死循环");
}

// 函数参数为对象(解构)时
function add({one, two}: { one: number, two: number }): number {
  return one + two;
}

const total = add({one: 1, two: 2});



