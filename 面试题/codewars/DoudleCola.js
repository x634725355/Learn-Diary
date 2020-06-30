function whoIsNext(names, r) {
    var _loop_1 = function (i) {
        for (var j = 0; j < 2; j++) {
            setTimeout(function () {
                names.push(names[i]);
            }, 0);
        }
    };
    for (var i = 0; i < r; i++) {
        _loop_1(i);
    }
    return names[r - 1];
}
var names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"];
console.log(whoIsNext(names, 100000000));
