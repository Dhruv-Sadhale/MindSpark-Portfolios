import React from "react";
import './App.css';
import Card from './Card.js';
import portfolios from './portfolios';
import logo from './ms_logo.png'; // Import the image
import Background from './Background'; // Import the Three.js background component
import './Card.scss';
function createCard(arg){
  return (<Card 
    key={arg.id}
    portfolio={arg.portfolio}
    desc={arg.desc}
  />);
}

function App() {
  return (
    <div className="App">
            <Background />
       {/* Render the Three.js background component */}
      <div className="content">
        <a href="/" className="MSLogoLink">
          <img className="MSLogo" src={logo} alt="logo" />
        </a>
        <div>PORTFOLIOS</div>
        <div className="cardContainer-parent">
        <div className="cardContainer">
          {portfolios.map(createCard)}
        </div>
        </div>
      </div>

    </div>
  );
}

export default App;
