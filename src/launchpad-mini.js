'use strict';
import Automap from './util/Automap';
import flattenDeep from 'lodash.flattendeep';

const automap = new Automap();
automap.mapDir('./src/wav/Arpeggios');
const colorMap = flattenDeep(automap.getMap()).map((cell)=>{
   return cell ? 'x' : '-';
});

const Launchpad = require('launchpad-mini'),
    pad = new Launchpad();

let lastKey = null;
let priorColor = null;

pad.connect().then(() => {     // Auto-detect Launchpad

    pad.reset();
    pad.col(pad.green, pad.fromMap(colorMap));
    pad.on('key', k => {
        let mapSound;
        if (k.pressed) {
            lastKey = k;
            pad.col(pad.amber, k);
            console.log(k.x.toString() + k.y.toString());
            mapSound = automap.lookup(k.x, k.y);
            if (mapSound) {
                mapSound.play();
            }
        } else {
            // Off when button is released
            pad.col(pad.green, k);
            mapSound = automap.lookup(k.x, k.y);
            if (mapSound) {
                //mapSound.stop();
            }
        }
    });
});