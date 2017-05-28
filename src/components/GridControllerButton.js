import React from 'react';

// Since this component is simple and static, there's no parent container for it.
const GridControllerButton = ({id, color, label, onButtonPress, onButtonRelease}) => (
    <div
        className="button-item"
        key={id}
        onMouseDown={onButtonPress}
        onMouseOver={onButtonPress}
        onMouseUp={onButtonRelease}
        onMouseOut={onButtonRelease}
        onTouchStart={onButtonPress}
        onTouchEnd={onButtonRelease}
        style={{backgroundColor: color}}
    >
    </div>
);

export default GridControllerButton;
