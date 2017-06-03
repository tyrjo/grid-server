import Afplay from './Afplay';
import fs from 'fs';

export default class Automap {

    constructor() {
        this.map = new Array(9);
        for (var i = 0; i < 9; i++) {
            this.map[i] = new Array(9);
        }
    }


    mapDir(directory) {
        const files = fs.readdirSync(directory).filter((file)=>{
            return file.includes('.wav');
        });
        console.log(files);
        let x = 0, y = 0;
        files.every((file)=> {
            this.map[x][y] = new Afplay(`${directory}/${file}`);
            x++;
            if (x > 7) {
                x = 0;
                y++;
                if (y > 7) {
                    return false;
                }
            }
            return true;
        });
    }

    lookup(x, y) {
        return this.map[x][y];
    }

    getMap() {
        return this.map;
    }
}