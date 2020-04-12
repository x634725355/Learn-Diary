const net = require('net');
const types = require('./types');

const server = net.createServer();

const users = [];

server.on('connection', socket => {
    console.log('有新连接介入');

    socket.on('data', data => {
        data = JSON.parse(data.toString().trim());
        switch (data.type) {
            case types.login:
                if (users.find(p => p.nickname === data.nickname)) {
                    return socket.write(JSON.stringify({
                        type: types.login,
                        success: false,
                        message: '昵称已重复'
                    }))
                }

                socket.nickname = data.nickname;

                users.push(socket);

                socket.write(JSON.stringify({
                    type: types.login,
                    success: true,
                    message: '登录成功',
                    sumUsers: users.length,
                    nickname: data.nickname
                }))
                break;
            case types.broadcast:
                users.forEach(pSocket => {
                    socket === pSocket || pSocket.write(JSON.stringify({
                        type: types.broadcast,
                        nickname: socket.nickname,
                        message: data.message
                    }))
                })
                break;
            case types.p2p:

                break;
            default:
                break;
        }
    });

});

server.listen('3332', () => console.log('服务器部署完成'));