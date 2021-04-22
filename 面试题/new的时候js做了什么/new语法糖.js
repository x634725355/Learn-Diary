
// #### new的时候 js做了什么

function person(Con, ...args) {
    let obj = Object.create(Con.prototype);

    let result = Con.call(obj, ...args);

    return result instanceof Object ? result : obj;
}

