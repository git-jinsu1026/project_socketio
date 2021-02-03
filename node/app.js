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

//사용자
const color = [
    "yellow",
    "green",
    "red",
    "blue",
    "white",
    "black",
]


io.on('connection', (socket) => {

    const username = color[Math.floor(Math.random() * 6)];

    //랜덤으로 이름이 입장하였습니다.
    socket.broadcast.emit('join', { username });

    //console.log('소켓 서버 접속')
    socket.on('client message', (data) => {

        //console.log(data)
        //2 전체메시지로 서버에서 뿌려주는 부분
        io.emit('server message', {
            username,
            message: data.message
        })

    });

    //로그아웃 나갈때
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { username });
    });
})