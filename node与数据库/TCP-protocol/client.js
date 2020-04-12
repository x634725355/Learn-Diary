const net = require('net');
const types = require('./types');

let nickname = null;

// 设置连接的服务器的ip地址与端口号
const client = net.createConnection({
    host: '127.0.0.1',
    port: 3332
});


// 连接服务器
client.on('connect', () => {
    console.log('连接成功');

    // 连接成功后给服务端发送数据
    // client.write('收到请求, 立即支援 over over');

    process.stdout.write('请输入昵称: ');

    // 获取终端的输入发送给服务器
    process.stdin.on('data', data => {
        data = data.toString().trim();

        // 判断是否有昵称
        if (!nickname) {
            client.write(JSON.stringify({
                type: types.login,
                nickname: data
            }));
        }

        // 群聊
        client.write(JSON.stringify({
            type: types.broadcast,
            message: data
        }))

    })

})

client.on('data', data => {
    data = JSON.parse(data.toString());

    switch (data.type) {
        case types.login:
            if (!data.success) {
                console.log(`登录失败: ${data.message}`);
                process.stdout.write('请输入昵称: ');
            } else {
                console.log(`登录成功,当前在线人数: ${data.sumUsers}`);
                nickname = data.nickname;
            }
            break;
        case types.broadcast:
            console.log(`${data.nickname}: ${data.message}`);
            break;
        case types.p2p:

            break;
        default:
            console.log('未知的情况');
            break;
    }

})