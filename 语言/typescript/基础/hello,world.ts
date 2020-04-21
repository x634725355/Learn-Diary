
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

console.log(greeter(user));

// 'xxx: number' 表示声明一个number类型
const num: number = 123;

// 声明一个函数的参数类型(number以及any) 和 返回值(void)
function fn(arg1: number, arg2: any): void {
    // todo
    return console.warn(arg1, arg2)
}

// 声明一个接口
interface IPerson {
    name: String // IPerson需要包含一个name属性，类型是string
    age: number // IPerson需要包含一个age属性，类型是number
    family: string[] // IPerson需要包含一个family属性，类型是数组，数组里面都是String类型的数据
    sex?: '男' | '女' // IPerson可选一个sex属性，值为'男'或者'女'或者undefined
};

// 使用IPerson接口定义一个对象，如果对象不符合IPerson的定义，编译器会飘红报错
const person: IPerson = {
    name: 'momo',
    age: 12,
    family: ['父', '母']
};

// type类似interface，以下写法等同用interface声明IPerson
type IPerson2 = {
    name: string
    age: number
    family: string[]
    sex?: '男' | '女'
}


const person2: IPerson = person;

console.log(person2);

// Object object表示非原始类型, 也就是除number/ string/ boolean/ symbol/ null/ undefined之外的类型:
let array: object = [12, 233];

// 字面量
const n: number = 123;
// 非字面量
const N: Number = new Number(132);

// 元组（Tuple） 要严格按照规定的类型与数量 位置也不能变
let list: [number, string] = [1, '2'];

// 枚举（enum） 可以反向通过值得到他的键值
enum Color { Red, Green, Blue }
Color[2] === 'Grenn'; // true

class Student implements IPerson2 {
    name = '123';
    age = 1;
    family = ['1']
    eat(food: string) {
        console.log(food);
    }
    say(word: string) {
        return word;
    }
}

// & 表示并且的关系 两个都要满足, 用 & 连接多个类型, 常用于对象合并;
interface A { a: number }
interface B { b: string }
const a: A = { a: 1 };
const b: B = { b: '1' };
const ab: A & B = { ...{ a: 1 }, ...b };






