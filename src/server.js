const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var midi = require('midi');

var midiInput, midiOutput;

server.listen(3000, '192.168.1.10');

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

setupMidi();

function setupMidi() {
    midiInput = new midi.input();
    midiOutput = new midi.output();

    var portCount = midiOutput.getPortCount();
    for(var i=0; i<portCount; i++) {
        var name = midiOutput.getPortName(i);
        if (name === 'SimpleSynth virtual input') {
            console.log("opening port", name);
            midiOutput.openPort(i);
            break;
        }
    }
    /*
     WebMidi.enable((error)=> {
     if (error) {
     console.error(error);
     }

     console.log(WebMidi.inputs);
     console.log(WebMidi.outputs);

     midiInput = WebMidi.getInputByName("IAC Driver Bus 1");

     midiInput.addListener('noteon', "all", (e)=> {
     console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
     }
     );

     midiOutput = WebMidi.getOutputByName("IAC Driver IAC Bus 2");
     });
     */
}

io.on('connection', function (socket) {
    socket.on('press', function (data) {
        //console.log(data);
        // note on, centered on middle C, velocity 100
        midiOutput.sendMessage([0x90, 28 + data.index, 100])
    });
    socket.on('release', function (data) {
        midiOutput.sendMessage([0x80, 28 + data.index, 0])
    });
});