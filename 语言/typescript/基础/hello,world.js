var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
console.log(greeter(user));
// 'xxx: number' 表示声明一个number类型
var num = 123;
// 声明一个函数的参数类型(number以及any) 和 返回值(void)
function fn(arg1, arg2) {
    // todo
    return console.warn(arg1, arg2);
}
;
// 使用IPerson接口定义一个对象，如果对象不符合IPerson的定义，编译器会飘红报错
var person = {
    name: 'momo',
    age: 12,
    family: ['父', '母']
};
var person2 = person;
console.log(person2);
// Object object表示非原始类型, 也就是除number/ string/ boolean/ symbol/ null/ undefined之外的类型:
var array = [12, 233];
// 字面量
var n = 123;
// 非字面量
var N = new Number(132);
// 元组（Tuple） 要严格按照规定的类型与数量 位置也不能变
var list = [1, '2'];
// 枚举（enum） 可以反向通过值得到他的键值
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
Color[2] === 'Grenn'; // true
var Student = /** @class */ (function () {
    function Student() {
        this.name = '123';
        this.age = 1;
        this.family = ['1'];
    }
    Student.prototype.eat = function (food) {
        console.log(food);
    };
    Student.prototype.say = function (word) {
        return word;
    };
    return Student;
}());
var a = { a: 1 };
var b = { b: '1' };
var ab = __assign({ a: 1 }, b);
// 泛式方法
function gen_func1(arg) {
    return arg;
}
// 或者
var gen_func2 = function (arg) {
    return arg;
};
// 泛型参数名可以随意命名
function identity(arg) {
    return arg;
}
function identity1(arg) {
    return arg;
}
var myIdentity = identity1;
// 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间
// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
// 创建一个实例里面的定义的泛型为number
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
// 创建一个实例里面的定义的泛型为string
var myGenericString = new GenericNumber();
function loggingIdentity(arg) {
    console.log(arg.length, arg);
    return arg;
}
// loggingIdentity(3) // Error, number doesn't have a .length property
// 我们需要传入符合约束类型的值，必须包含必须的属性：
loggingIdentity({ length: 10, value: 3 });
