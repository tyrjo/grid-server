import EventEmitter from 'events';
import Midi from '../../util/Midi';

export const EVENT_START = 'EVENT_START';
export const EVENT_STOP = 'EVENT_STOP';

const PLAY_EXAMPLE = 'PLAY_EXAMPLE';
const INPUT = 'INPUT';

const states = ['PLAY_EXAMPLE', 'INPUT'];
export default class Echo extends EventEmitter {

    constructor() {
        super();
        this.midi = new Midi();
        this.noteSpaceMs = 500;
        this.noteDurationMs = 300;
        this.sequence = [24, 24, 25, 27, 27, 25, 24, 22, 20, 20, 22, 24, 24, 22, 22];
        this.sequenceIndex = 0;
        this.state = PLAY_EXAMPLE;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.playNextNote = this.playNextNote.bind(this);
        this.run = this.run.bind(this);
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
        this.start(1, 'red');
        setTimeout(()=> {
            this.stop(1, 'silver');
            this.run();
        }, 1000);
    }

    success() {
        this.state = PLAY_EXAMPLE;
        this.sequenceIndex = 0;
        this.start(64, 'green');
        setTimeout(()=> {
            this.stop(64, 'silver');
            this.run();
        }, 1000);
    }

    onPress(note) {
        switch (this.state) {
            case PLAY_EXAMPLE:
                this.midi.onPress(note);
                break;
            case INPUT:
                if (note == this.sequence[this.sequenceIndex]) {
                    this.midi.onPress(note);
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
        this.midi.onRelease(note);
    }

}