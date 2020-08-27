import "../css/main.scss"
import io from 'socket.io-client';


const socket = io.connect("ws://localhost:3008/slots/110ec58a-a0f2-4ac4-8393-c866d813b8d1");
socket.on('error', (err) => {
    console.log(err);
});

socket.on('disconnect', (err) => {
    console.log(err);
});

socket.on("play-slots", (data, callback) => {
    console.log(data.user, data.numbers)
    callback();
})