const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

import Echo from './games/echo';
import {EVENT_START} from './games/echo';
import {EVENT_STOP} from './games/echo';


const startMidiNote = 28;

server.listen(3000, '192.168.1.10');

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var echo = new Echo();

io.on('connection', function (socket) {
    echo.on(EVENT_START, (event)=> {
        socket.emit('press', {
            index: event.note - startMidiNote,
            color: event.color
        });
    });

    echo.on(EVENT_STOP, (event)=> {
        socket.emit('release', {
            index: event.note - startMidiNote,
            color: event.color
        });
    });
    echo.run();

    socket.on('press', function (data) {
        // note on, centered on middle C, velocity 100
        echo.onPress(data.index + startMidiNote);
    });
    socket.on('release', function (data) {
        echo.onRelease(data.index + startMidiNote);
    });
});