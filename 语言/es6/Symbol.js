// Symbol 一般用于做为属性名 map表映射

let momo = Symbol("momo");
let koko = Symbol("koko");
let lili = Symbol("lili");

// 写法一 使用 Symbol 做属性名 
let obj = {
  [momo]: '我是momo',
  [koko]: '我是koko',
  [lili]: '我是lili',
}

// 这样调用Symbol做属性的对象
console.log(obj[momo]);

console.log(Object.keys(obj)); // 打印出来是  []
