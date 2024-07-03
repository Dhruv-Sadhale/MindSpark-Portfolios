import React, { useEffect } from "react";
import './Card.scss';
import $ from 'jquery'; // Import jQuery

function Card(props) {
  useEffect(() => {
    // Use jQuery within useEffect to ensure it runs after the component is mounted
    $(".option").click(function() {
      $(".option").removeClass("active");
      $(this).addClass("active");
    });
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)
  
  return (
    <div className="option">
      <div className="shadow"></div>
      <div className="label">
        <div className="icon">
          <i className={`fas ${props.icon}`}>{props.portfolio.charAt(0)}</i> {/* Display first letter of title in icon */}
        </div>
        <div className="info">
          <div className="main">{props.portfolio}</div>
          <div className="sub">{props.desc}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
