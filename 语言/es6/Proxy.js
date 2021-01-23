let obj = new Proxy({}, {
    get(target, propKey, receiver) {
        console.log(`getting ${propKey}`);
        return Reflect
    },
    set(target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});

obj.count = 1;

++obj.count;
