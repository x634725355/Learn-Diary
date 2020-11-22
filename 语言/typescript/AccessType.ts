{
  // public 公共的 允许在类的内部和外部被调用
  // private 只允许再类的内部被调用, 外部不允许调用
  // protected 允许在类内及继承的子类中使用

  class Person {
    private name: string;
    protected color: string;
    public sayHello() {
      this.color = "red";
      this.name = "momo"
      console.log(this.name + this.color + "say Hello");
    }
  }


  let person = new Person();

  // person.name = "momo";
  person.sayHello();

  // console.log(person.name);

  class Teacher extends Person {
    public sayBye() {
      this.color = "green";
    }
  }


}