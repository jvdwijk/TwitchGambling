import "../css/main.scss"
import io from 'socket.io-client';
import gamblingConfig from "../configs/gamblingConfig.json"


const canvas = document.getElementById("gambling-machine");
const ctx = canvas.getContext('2d');

const socket = io.connect("ws://localhost:3008/slots");
socket.on('error', (err) => {
    console.log(err);
});

socket.on('disconnect', (err) => {
    console.log(err);
});

socket.on("play-slots", (data, callback) => {
    drawSlots(data, callback);
});

function drawSlots(data, callback) {
    console.log(data.user, data.numbers[0])
    let img = new Image(100,100);
    console.log(data)
    // img.src = "src/" + gamblingConfig.characters[data.numbers[0][0]];
    //ctx.drawImage(img, 100, 100)

    
    
    // callback();
}