// get
{
    let myObject = {
        foo: 1,
        bar: 2,
        get momo() {
            return this.foo + this.bar;
        }
    };

    console.log("foo:", Reflect.get(myObject, 'foo'));
    console.log("bar:", Reflect.get(myObject, 'bar'));
    console.log("momo:", Reflect.get(myObject, 'momo'));

    let myReceiverObject = {
        foo: 4,
        bar: 4
    };

    console.log("myReceiverObject", Reflect.get(myObject, 'momo', myReceiverObject));
}
// set
{
    let myObject = {
        foo: 4,
        set bar(value) {
            return this.foo = value;
        }
    };

    let myMomo = {
        foo: 0
    };

    Reflect.set(myObject, 'bar', 1, myMomo);
    console.log("myObject", myObject.foo);
    console.log("myMomo", myMomo.foo);
}
// 被Proxy拦截
{
    let p = {
        a: 'a'
    };

    let handle = {
        set(target, key, value, receiver) {
            console.log('set');
            Reflect.set(target, key, value, receiver);
        },
        defineProperty(target, key, attribute) {
            console.log("defineProperty");
            Reflect.defineProperty(target, key, attribute);
        }
    };

    let obj = new Proxy(p, handle);
    obj.a = "A";
}

// 使用 Proxy 实现观察者模式
{
    const queuedObservers = new Set();

    const observe = fn => queuedObservers.add(fn);
    const observable = obj => new Proxy(obj, { set });

    function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);

        queuedObservers.forEach(observer => observer());

        return result;
    }

    const person = observable({
        name: "momo",
        age: 20,
    });

    function print() {
        console.log(`${person.name}, ${person.age}`);
    }

    observe(print);

    person.name = 'kaka';

    // console.log("person", person.name);
}

