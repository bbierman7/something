import React from "react";

import "./Card.css";

const Card = props => (
    <div className = {`card ${props.finish ? " finish":""}`} id = {props.id} onClick = {props.handleCardClick}>
    <img className = "card-img" src = {props.image} alt = "sports"/>
    </div>
);

export default Card;