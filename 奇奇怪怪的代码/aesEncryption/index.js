const cryptoJS = require('./aes_ecb/test');

console.log(cryptoJS.Decrypt("65ZKxC8byB3jqUIaBcigPHuqJ6VWuBvPlw6aysxjxtsCvaC25CIy9zYk4IJTSr86"));

console.log(cryptoJS.Encrypt(JSON.stringify({ momo: "哈哈哈哈哈" })));