import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../App.css';
import babyImage from '../assets/baby-girl.svg';
import headerImage from '../assets/baby_texture.png';
import transitionsData from '../assets/transitions.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the custom hook
import { useBabyTransitions } from '../hooks/useBabyTransitions';
import { formatMessage } from '../utils/utils';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage);
preloadImage(headerImage);

function BabyWeeksCalculator() {
  const [startDate, setStartDate] = useState(null); // Default to null
  const sliderRef = useRef(null);

  const {
    weekDifference,
    currentMessageIndex,
    displayedMessage,
    allTransitions,
    setCurrentMessageIndex,
  } = useBabyTransitions(startDate, transitionsData);

  // Show slider if valid transitions exist
  const showSlider =
    startDate &&
    weekDifference !== null &&
    allTransitions.length > 0 &&
    currentMessageIndex !== null;

  return (
    <div className="App text-center">
      <header className="App-header">
        <div className="container pt-4">
          <img src={babyImage} className="App-logo" alt="Baby" />
          <h1 className="fw-bold">Babyweeks</h1>
          <p className="lead">Explore Your Infant's Development <Link to="/about"><span className="material-icons">info</span>
          </Link></p>
        </div>
        <svg height="1" width="100%" className="header-line">
          <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
        </svg>
      </header>

      <main>
        <div className="calculator">
          <label className="display-6" htmlFor="date">Insert Birthdate</label>
          <div className="input-wrapper">
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="my-2 form-control text-center lead"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
            />
          </div>

          {/* Show fallback message only when no valid transitions exist */}
          {!showSlider && displayedMessage && (
            <div className="message show">
              {displayedMessage}
            </div>
          )}

          {/* Render slider when transitions exist */}
          {showSlider && (
            <div className="message-slider">
              <Slider
                ref={sliderRef}
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={currentMessageIndex || 0}
                afterChange={(index) => {
                  console.log("Slider Changed to Index:", index);
                  setCurrentMessageIndex(index); // Update index
                }}
              >
                {allTransitions.map((transition, index) => (
                  <div key={index} className="message">
                    {formatMessage(transition)}
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </main>

      {/* Add a link to the About Page */}
      <footer className="mt-5 py-3">
        <p>© 2025 · Crafted with ❤️ by ntemposd</p>
      </footer>
    </div>
    
  );
}

export default BabyWeeksCalculator;
