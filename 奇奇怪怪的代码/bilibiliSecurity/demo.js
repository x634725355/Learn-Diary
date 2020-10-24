const request = require('request');

let uid = 100336889;

let options = {
  // url: "http://45.113.201.36/api/ctf/5?uid=" + uid,
  method: "GET",
  async: true,
  headers: {
    "Cookie": "session=eyJ1aWQiOiIxNTcyMzUwIn0.X5Q_0A.Qo50WxRYtbz4Bw2qVX4pE3bYI-w; role=ee11cbb19052e40b07aac0ca060c23ee"
  },
};

function momo() {
  request("http://45.113.201.36/api/ctf/5?uid=" + uid, options,(err, res, body) => {
    
  })
}