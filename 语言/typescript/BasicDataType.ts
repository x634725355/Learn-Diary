// 对象类型
{
  let animal: {
    name: string,
    color: string,
    age: number
  } = {
    name: 'momo',
    color: 'red',
    age: 3
  };

  // 会报错
  // animal = ['name', 'color', 11]

  console.log(animal.name);
}

// 数组类型
{
  const animals: String[] = ['momo', 'red'];

  console.log(animals);

}

// 类类型
{
  class Animal { }
  const momo: Animal = new Animal();
}

// 函数类型
{
  const animal: () => string = () => {
    return 'momo';
  }

  console.log(animal);
  
}

