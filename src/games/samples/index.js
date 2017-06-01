import play from 'play';
import EventEmitter from 'events';

export default class Play extends EventEmitter {

    constructor() {
        super();
    }

    run() {
        return;
    }

    onPress(note) {
        play.sound('./src/wav/boing.wav');
    }

    onRelease(note) {
        return;
    }

}