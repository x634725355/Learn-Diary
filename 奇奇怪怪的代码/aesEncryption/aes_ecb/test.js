//工具方法
var base64 = require('./base64.js');  
var CryptoJS = require('./aes.js');
var aeskey = "abcdefgabcdefg12";

module.exports = {
  base64Dcode: base64Dcode,//64位解密
  Encrypt: Encrypt,//AES加密
  Decrypt: Decrypt,//AES解密
}



//base 64位 加密
function base64Dcode( content ){
  //var content = "PGltZyBzcmM9Imh0dHA6Ly8xNzIuMzAuMTIuMTQ6OTk5OS9ncm91cDEvTTAwLzAwLzA0L3JCNE1FVm82TUMyQU5CaEFBQUdLbkpiQlVDRTUyNi5wbmciIGFsdD0ibnVsbCI+";
  var result = base64.CusBASE64.decoder(content); 
  console.log("base64Dcode.content=" + content); 
  console.log("base64Dcode.result=" + result);

  return result;
}

//AES加密
function Encrypt(word) {
  //var aeskey = "E8N3Rfk51nbm810V";
  var key = CryptoJS.enc.Utf8.parse(aeskey);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: getEcb(), padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();  
}

//AES解密
function Decrypt(word) {
  //var aeskey = "E8N3Rfk51nbm810V";
  var key = CryptoJS.enc.Utf8.parse(aeskey);
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: getEcb(), padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();  
}

function getEcb() {
  var ECB = CryptoJS.lib.BlockCipherMode.extend();
  ECB.Encryptor = ECB.extend({
    processBlock: function (words, offset) {
      this._cipher.encryptBlock(words, offset);
    }
  });
  ECB.Decryptor = ECB.extend({
    processBlock: function (words, offset) {
      this._cipher.decryptBlock(words, offset);
    }
  });
  return ECB;
}

