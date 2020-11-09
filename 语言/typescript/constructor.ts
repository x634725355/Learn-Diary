{
  
  class Person {
    // 相当于定义了一个name函数
    constructor(public name: string) {
      this.name = name;
    }
  }

  class Teacher extends Person {
    constructor(public age: number) {
      super('kaka')
    }
  }

  const person = new Person("momo");
  const teacher = new Teacher(18);

  console.log(person.name);
  console.log(teacher.age, teacher.name);
  

}
