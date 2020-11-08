{

  // 接口中加 ? 指可有可无参数
  // 允许接口加入任意值 
  interface Animal {
    name: string,
    age: number,
    color: string,
    weight?: number, // 可有可无
    [propname: string]: any, // 值属性名字是字符串类型, 属性的值是任意类型
    say(): string
  }

  let screenResume = (name: string, age: number, color: string) => {
    age < 24 && color === "red" && console.log(name + "就选中是你了");
    age > 3 && color === "blue" && console.log(name + "你被淘汰了");
  };

  let getResume = (animal: Animal) => {
    console.log(animal.name + "年龄是: " + animal.age);
    console.log(animal.name + "颜色是: " + animal.color);
  };

  screenResume("momo", 20, "red");
  getResume({ name: "koko", age: 10, color: "green", sex: "公", say() { return "哈哈哈哈" } });

  // 类型别名于接口的区别
  // 接口只能是对象
  interface cat {
    name: "",
    age: ""
  }
  // 类型别名可以直接给类型
  type doge = string;


  // 类也可以用接口定义
  class Momo implements Animal {
    name = "lili";
    age = 4;
    color: "white";
    say() {
      return "你好";
    }
  }

  // 接口也可以继承
  interface Doge extends Animal {
    doge(): string;
  }

  let getDogeResume = (animal: Doge) => {
    console.log(animal.name + "年龄是: " + animal.age);
    console.log(animal.name + "颜色是: " + animal.color);
    
  }

}