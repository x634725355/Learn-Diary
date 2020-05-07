
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
    readonly family: string[] // readonly 只读属性
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


// 泛式方法
function gen_func1<T>(arg: T): T {
    return arg;
}

// 或者

let gen_func2: <T>(arg: T) => T = function (arg) {
    return arg;
}

// 泛型参数名可以随意命名
function identity<U>(arg: U): U {
    return arg;
}

// 定义泛型接口
// 两种写法 第一种
interface GenericIdentityFn {
    <T>(arg: T): T;
}

// 第二种
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

function identity1<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn2<number> = identity1;

// 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间
// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y?: T) => T;
}

// 创建一个实例里面的定义的泛型为number
let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// 创建一个实例里面的定义的泛型为string
let myGenericString = new GenericNumber<string>();


// 泛型约束

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length, arg);

    return arg;
}

// loggingIdentity(3) // Error, number doesn't have a .length property

// 我们需要传入符合约束类型的值，必须包含必须的属性：
loggingIdentity({ length: 10, value: 3 });


// 类

class momo {
    // 当成员被标记成 private时，它就不能在声明它的类的外部访问
    private name: string;

    // 声明可保护变量 可在该类中 或者 派生类中访问
    protected age: number;

    // 公共属性 
    public sex?: '男' | '女'; 

    // 静态属性 
    static momo: any;
}







