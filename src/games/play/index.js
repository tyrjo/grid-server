import Midi from '../../util/Midi';
import EventEmitter from 'events';

export default class Play extends EventEmitter {

    constructor() {
        super();
        this.midi = new Midi();
    }

    run() {
        return;
    }

    onPress(note) {
        this.midi.onPress(note);
    }

    onRelease(note) {
        this.midi.onRelease(note);
    }

}