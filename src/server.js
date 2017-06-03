const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

import Echo from './games/echo';
import Play from './games/play';
import Patterns from './games/patterns';
import Samples from './games/samples';

import {EVENT_START} from './games/echo';
import {EVENT_STOP} from './games/echo';

import Midi from './util/Midi';

const midi = new Midi();

const startMidiNote = 28;

server.listen(3000, '192.168.1.10');

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var echo = new Echo();
var play = new Play();
var patterns = new Patterns();
var samples = new Samples();
var currentGame = echo;

io.on('connection', function (socket) {
    currentGame.on(EVENT_START, (event)=> {
        socket.emit('press', {
            index: event.note,
            color: event.color
        });
        midi.sendPress(event.note);
    });

    currentGame.on(EVENT_STOP, (event)=> {
        socket.emit('release', {
            index: event.note,
            color: event.color
        });
        midi.sendRelease(event.note);
    });
    currentGame.run();

    socket.on('press', function (data) {
        currentGame.onPress(data.index);
    });
    socket.on('release', function (data) {
        currentGame.onRelease(data.index);
    });
});