let obj = new Proxy({}, {
    get(target, propKey, receiver) {
        console.log(`getting ${propKey}`);
        return Reflect
    },
    set(target, propKey, receiver) {
        
    }
})