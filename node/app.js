const express = require('express');

const app = express();
const port = 3000;


app.get('/', (_, res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

//server에 소켓서버를 붙인다
const listen = require('socket.io');
const io = listen(server);
//

io.on('connection', (socket) => {

    //console.log('소켓 서버 접속')
    socket.on('client message', (data) => {

        //console.log(data)
        //2 전체메시지로 서버에서 뿌려주는 부분
        io.emit('server message', {
            message: data.message
        })

    })
})