import Afplay from './Afplay';
import fs from 'fs';

export default class Memory {

    constructor() {
        this.map = new Array(9);
        for (var i = 0; i < 9; i++) {
            this.map[i] = new Array(9);
        }
    }

    add(x, y) {
        this.map[x][y] = 'x';
    }

    clear(x, y) {
        this.map[x][y] = null;
    }
}