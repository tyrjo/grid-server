const exec = require('child_process').exec;

export default class Afplay {

    constructor(file) {
        this.file = file;
    }

    play() {
        this.child = exec(`afplay "${this.file}"`, (error, stdout, stderr)=> {
            if (error) {
                //console.error("error: ", error);
                return;
            }
            //console.log(`stdout: ${stdout}`);
            //console.log(`stderr: ${stderr}`);
        });
    }

    stop() {
        if ( this.child ) {
            this.child.kill();
        }
    }
}