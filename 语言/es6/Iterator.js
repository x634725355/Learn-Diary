// let a = [1,2,3,4,5,6];
// for (const iterator of a) {
//   console.log(iterator);
// }

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());


// 对象上面部署原型方法
class RangeIterator {
  constructor(start, end) {
    this.value = start;
    this.stop = end;
  }

  [Symbol.iterator]() { return this; }

  next() {
    let value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value };
    }
    return { done: true, value: undefined };
  }
}
 
function range(start, end) {
  return new RangeIterator(start, end);
}

let rangeMomo = range(0,5);
console.log("rangeMomo", [...rangeMomo]);

for (let value of range(0, 3)) {
  console.log('对象',value);
}


function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  let iterator = { next };
  let current = this;

  function next() {
    if (current) {
      let value = current.value;
      current = current.next;
      return { done: false, value };
    } else {
      return { done: true };
    }
  }

  return iterator;
}

let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);

one.next = two;
two.next = three;

for (const i of one) {
  console.log('i', i);
}

