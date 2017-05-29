import React from 'react';
import io from 'socket.io-client';
import '../styles/grid-controller-page.css';

import GridController from './GridController';

class App extends React.Component {

    constructor() {
        super();

        document.ontouchmove = function (event) {
            event.preventDefault();
        };
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onButtonRelease = this.onButtonRelease.bind(this);

        this.socket = io.connect('http://192.168.1.10:3000');

        this.socket.on('press', (data)=>{
            this.onButtonPress(data.index, data.color);
        });

        this.socket.on('release', (data)=>{
            this.onButtonRelease(data.index, data.color);
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

    onButtonPress(index, color) {
        this.socket.emit('press', {index});
        var buttonsState = this.state.buttonsState.slice(0);
        buttonsState[index-1].color = color || 'blue';
        this.setState({
            buttonsState
        })
    }

    onButtonRelease(index, color) {
        this.socket.emit('release', {index});
        var buttonsState = this.state.buttonsState.slice(0);
        buttonsState[index-1].color = color || 'silver';
        this.setState({
            buttonsState
        })
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