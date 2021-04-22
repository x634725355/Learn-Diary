
const double = (arrIn) => {
    let arrOut = [];

    arrIn.forEach(p => { arrOut.push(p * 2); });

    return arrOut;
}

const increment = (arrIn) => {
    let arrOut = [];

    arrIn.forEach(p => { arrOut.push(p + 1) })

    return arrOut;
}

const foo = (i, d) => {
    return (x) => {
        return i(d(x));
    }
}
