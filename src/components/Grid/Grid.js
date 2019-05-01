import React from "react";

import "./Grid.css";

const Grid = props => (
    <div className = {`container ${props.shake ? " shake":""}`}>
    {props.children}
    </div>
);

export default Grid;