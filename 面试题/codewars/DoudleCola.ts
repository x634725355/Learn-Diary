
function whoIsNext(names: Array<String>, r: number): String {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < 2; j++) {
      names.push(names[i]);
    }
  }

  return names[r - 1];
}


let names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"];
console.log(whoIsNext(names, 100000000));