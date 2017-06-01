var midi = require('midi');

export default class Midi {

    constructor() {
        this.setupMidi();
        // centered on middle C
        this.startMidiNote = 28;
    }

    setupMidi() {
        this.midiInput = new midi.input();
        this.midiOutput = new midi.output();

        var portCount = this.midiOutput.getPortCount();
        for (var i = 0; i < portCount; i++) {
            var name = this.midiOutput.getPortName(i);
            if (name === 'IAC Driver Bus 1') {
                console.log("opening port", name);
                this.midiOutput.openPort(i);
                break;
            }
        }
    }

    onPress(note) {
        this.midiOutput.sendMessage([0x90, note + this.startMidiNote, 127]);
    }

    onRelease(note) {
        this.midiOutput.sendMessage([0x80, note + this.startMidiNote, 0])
    }

}