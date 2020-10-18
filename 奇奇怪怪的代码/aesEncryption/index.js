const cryptoJS = require('./aes_ecb/test');

console.log(cryptoJS.Decrypt("yp3ye9cuklb/W94IWThBemwiqGfuT9t2xa4gC+HNfdCmoCc0OMOJOEhXrt5iPDWqT1ajpyMJubedhEf0BYRlw0QqR1XAl2SAZLaInQJp2rjIa2ropbiaN1Ww/s4ffuRv/tNiUwtzdZ7uSzYZIHb0iYOOf9cskWLzmGlPkBCaPRjt+mPEMNG/HiuZZRTPQpDaTVEUdofj3KvguP95ZrstNQ=="));

console.log(cryptoJS.Encrypt(JSON.stringify({ momo: "哈哈哈哈哈" })));