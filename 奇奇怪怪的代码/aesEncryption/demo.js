const CryptoJS = require("crypto-js");

let momo = CryptoJS.AES.encrypt(JSON.stringify({ momo: "哈哈哈哈哈哈哈哈哈哈哈哈" }), "123456789").toString();

console.log("momo", momo);

let bytes = CryptoJS.AES.decrypt("65ZKxC8byB3jqUIaBcigPHuqJ6VWuBvPlw6aysxjxtsCvaC25CIy9zYk4IJTSr86", "abcdefgabcdefg12");

console.log(bytes);

let originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText);
