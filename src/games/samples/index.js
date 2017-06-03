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
        play.sound('./src/wav/36.wav');
    }

    onRelease(note) {
        return;
    }

}