import React from 'react';
import PropTypes from 'prop-types';
import GridControllerButton from './GridControllerButton';

// Since this component is simple and static, there's no parent container for it.
class GridController extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onButtonRelease = this.onButtonRelease.bind(this);
    }

    onButtonPress(index) {
        this.props.buttonPress(index);
    }

    onButtonRelease(index) {
        this.props.buttonRelease(index);
    }

    render() {
        let rows = [];
        for (let row_index = 0; row_index < 8; row_index++) {
            let row = [];
            for (let col_index = 0; col_index < 8; col_index++) {
                let id = 8 * row_index + col_index + 1;
                row.push((
                    <GridControllerButton
                        id={id}
                        key={id}
                        color={this.props.buttonsState[id-1].color}
                        onButtonPress={() => {
              this.onButtonPress(id)
            }}
                        onButtonRelease={() => {
              this.onButtonRelease(id)
            }}
                        label={id}
                    />
                ));
            }
            rows.push((
                <div key={row_index} className="button-row">
                    {row}
                </div>
            ));
        }
        return (
            <div className="button-grid">
                {rows}
            </div>
        );
    }
}

GridController.PropTypes = {
    buttonPress: PropTypes.func.isRequired,
    buttonRelease: PropTypes.func.isRequired,
    buttonsState: PropTypes.array.isRequired,
};

export default GridController;
