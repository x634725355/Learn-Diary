const numberArr: number[] = [1, 2, 3];

const stringArr: string[] = ["a", "b", "c"];

const undefinedArr: undefined[] = [undefined, undefined];

// 数组中有多个类型  使用() 里面 加上 | 的形式就ok了
const numberStringArr: (number | string)[] = ['momo', 123];

// 数组中对象类型的定义
const objArr: { name: string, age: number }[] = [{ name: "momo", age: 123 }];

// 类型别名 使用type关键字开始定义
type Animal = { name: string, age: number };

let cat: Animal[] = [{ name: "momo", age: 2 }];

class Doge {
  name: string;
  age: number;
}

let doge: Doge[] = [{name: "momo", age: 123}]; 
