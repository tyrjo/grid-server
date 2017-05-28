import React from 'react';
import io from 'socket.io-client';
import '../styles/grid-controller-page.css';

import GridController from './GridController';

class App extends React.Component {

    constructor() {
        super();

        this.onButtonPress = this.onButtonPress.bind(this);
        this.onButtonRelease = this.onButtonRelease.bind(this);

        this.socket = io.connect('http://192.168.1.10:3000');
        this.socket.on('news', (data) => {
            console.log(data);
            this.socket.emit('my other event', {my: 'data'});
        });
        const buttonsState = [];
        for (var i = 0; i < 64; i++) {
            buttonsState.push({
                color: 'silver'
            })
        }
        this.state = {
            buttonsState
        }
    }

    onButtonPress(index) {
        this.socket.emit('press', {index});
    }

    onButtonRelease(index) {
        this.socket.emit('release', {index});
    }

    render() {
        return (
            <div className='full-height'>
                <GridController
                    buttonPress={this.onButtonPress}
                    buttonRelease={this.onButtonRelease}
                    buttonsState={this.state.buttonsState}
                />
            </div>
        )
    }
}

export default App;