import EventEmitter from 'events';
var midi = require('midi');

export const EVENT_START = 'EVENT_START';
export const EVENT_STOP = 'EVENT_STOP';

const PLAY_EXAMPLE = 'PLAY_EXAMPLE';
const INPUT = 'INPUT';

const states = ['PLAY_EXAMPLE', 'INPUT'];
export default class Echo extends EventEmitter {

    constructor() {
        super();
        this.setupMidi();
        this.noteSpaceMs = 500;
        this.noteDurationMs = 300;
        this.sequence = [52, 52, 53, 55, 55, 53, 52, 50, 48, 48, 50, 52, 52, 50, 50];
        this.sequenceIndex = 0;
        this.state = PLAY_EXAMPLE;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.playNextNote = this.playNextNote.bind(this);
        this.run = this.run.bind(this);
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

    run() {
        // Play the sequence
        this.state = PLAY_EXAMPLE;
        this.playNextNote(0);
    }

    playNextNote(index) {

        if (index < this.sequence.length) {
            this.start(this.sequence[index], 'blue');
            setTimeout(()=> {
                // Stop the prior note
                this.stop(this.sequence[index], 'silver');
            }, this.noteDurationMs);
            setTimeout(()=> {
                this.playNextNote(index + 1);
            }, this.noteSpaceMs);
        } else {
            this.state = INPUT;
        }
    }

    start(note, color) {
        this.emit(EVENT_START, {
            note,
            color
        });
    }

    stop(note, color) {
        this.emit(EVENT_STOP, {
            note,
            color
        });
    }

    buzzer() {
        this.state = PLAY_EXAMPLE;
        this.sequenceIndex = 0;
        this.start(29, 'red');
        setTimeout(()=> {
            this.stop(29, 'silver');
            this.run();
        }, 1000);
    }

    success() {
        this.state = PLAY_EXAMPLE;
        this.sequenceIndex = 0;
        this.start(92, 'green');
        setTimeout(()=> {
            this.stop(92, 'silver');
            this.run();
        }, 1000);
    }

    onPress(note) {
        switch (this.state) {
            case PLAY_EXAMPLE:
                this.midiOutput.sendMessage([0x90, note, 100]);
                break;
            case INPUT:
                if (note == this.sequence[this.sequenceIndex]) {
                    this.midiOutput.sendMessage([0x90, note, 100]);
                    this.sequenceIndex += 1;
                    if ( this.sequenceIndex >= this.sequence.length ) {
                        this.success();
                    }
                } else {
                    this.buzzer();
                }
                break;
            default:
        }
    }

    onRelease(note) {
        this.midiOutput.sendMessage([0x80, note, 0])
    }

}