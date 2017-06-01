import EventEmitter from 'events';
import Midi from '../../util/Midi';

export const EVENT_START = 'EVENT_START';
export const EVENT_STOP = 'EVENT_STOP';

const PLAY_EXAMPLE = 'PLAY_EXAMPLE';
const INPUT = 'INPUT';

const states = ['PLAY_EXAMPLE', 'INPUT'];
export default class Patterns extends EventEmitter {

    constructor() {
        super();
        this.midi = new Midi();
        this.noteSpaceMs = 500;
        this.noteDurationMs = 300;
        this.sequences = [
            [1],
            [1, 2],
            [1, 2, 3, 4],
            [1, 2, 3, 4, 5, 6, 7, 8],
            [1, 9],
            [1, 9, 17, 25, 33, 41, 49, 57],
            [1, 10],
            [1, 10, 19, 28, 37, 46, 55, 64],
            [28, 29, 36, 37],
            [32, 36, 39, 31, 36, 39, 29, 36, 39],
        ];
        this.sequenceIndex = 0;
        this.currentSequence = 0;
        this.state = PLAY_EXAMPLE;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.playNextNote = this.playNextNote.bind(this);
        this.run = this.run.bind(this);
    }

    run() {
        // Play the sequence
        this.state = PLAY_EXAMPLE;
        this.playNextNote(0, this.sequences[this.currentSequence]);
    }

    playNextNote(index, sequence) {

        if (index < sequence.length) {
            this.start(sequence[index], 'blue');
            setTimeout(()=> {
                // Stop the prior note
                this.stop(sequence[index], 'silver');
            }, this.noteDurationMs);
            setTimeout(()=> {
                this.playNextNote(index + 1, sequence);
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
        this.currentSequence = (this.currentSequence + 1) % this.sequences.length;
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
                var sequence = this.sequences[this.currentSequence];
                if (note == sequence[this.sequenceIndex]) {
                    this.midi.onPress(note);
                    this.sequenceIndex += 1;
                    if (this.sequenceIndex >= sequence.length) {
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