
const momo = {
    a: 1,
    b: 2,
    c: [{a:1,b:2,c:3}],
    d: {
        a:1,
        b:2,
        c:3
    }
}

const momo2 = [{a:1,b:2,c:3, kaka: {a:1, b:2, c:3}, lili: [1,2,3]}];

function deep(data) {
    const mark;

    if (Array.isArray(data)) {
        mark = [];
        data.forEach(p => {
            if (p instanceof Object) {
                mark.push(deep(p)); 
            }
            mark.push(p);
        });
    } else {
        mark = {};
        const back = Object.keys(data);
        back.forEach(p => {
            if (data[p] instanceof Object) {
                mark[p] = deep(data[p]);
            }

            mark[p] = data[p];
        });
    }

    return mark;
}



