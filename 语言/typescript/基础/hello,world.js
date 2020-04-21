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
