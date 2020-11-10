{

  class Person {
    // 相当于定义了一个name函数
    constructor(public name: string, public date: number) {
      this.date = date;
      this.name = name;
    }
  }

  class Teacher extends Person {
    constructor(public age: number) {
      super('kaka', new Date().setMonth(24))
    }
  }

  const person = new Person("momo", new Date().setMonth(24));
  const teacher = new Teacher(18);

  console.log("人的任务", person.name, person.date);
  console.log(teacher.age, teacher.name);


}
