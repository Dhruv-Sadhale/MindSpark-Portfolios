import React from "react";
import './Card.scss';

function Card(props) {
  return (
    <div className="option">
      <div className="label">
        <div className="info">
          <div className="main">{props.portfolio}</div>
          <div className="sub">{props.desc}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
