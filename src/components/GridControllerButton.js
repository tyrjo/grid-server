import React from 'react';

// Since this component is simple and static, there's no parent container for it.
const GridControllerButton = ({id, color, label, onButtonPress, onButtonRelease}) => (
    <div
        className="button-item"
        key={id}
        onMouseDown={onButtonPress}
        onMouseUp={onButtonRelease}
        onTouchStart={onButtonPress}
        onTouchEnd={onButtonRelease}
        style={{backgroundColor: color}}
    >
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div>
                {id}
            </div>
        </div>
    </div>
);

export default GridControllerButton;
