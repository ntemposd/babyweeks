import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import babyImage from '../assets/baby-girl.svg';
import headerImage from '../assets/baby_texture.png';
import transitionsData from '../assets/transitions.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBabyTransitions } from '../hooks/useBabyTransitions';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage);
preloadImage(headerImage);

function BabyWeeksCalculator() {
  const [startDate, setStartDate] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const {
    weekDifference,
    currentMessageIndex,
    displayedMessage,
    allTransitions,
    setCurrentMessageIndex,
  } = useBabyTransitions(startDate, transitionsData);

  const showSlider =
    startDate &&
    weekDifference !== null &&
    allTransitions.length > 0 &&
    currentMessageIndex !== null;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSlideIndex(index),
  };

  return (
    <div className="App text-center">
      <header className={`App-header ${startDate ? 'minimized' : ''}`}>
        <div className="container pt-4">
          <img src={babyImage} className="App-logo" alt="Baby" />
          <h1 className="fw-bold">Growth Leaps</h1>
          <p className="lead">
            Explore Your Infant's Development {" "}
            <Link to="/about">
              <span className="material-icons">info</span>
            </Link>
          </p>
        </div>
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

          {/* New message displaying baby's age */}
          {weekDifference !== null && (
            <div className="baby-age-message">
              <p className="lead">Your baby is <strong>{weekDifference} weeks</strong> old.</p>
            </div>
          )}

          {!showSlider && displayedMessage && (
            <div className="message show">{displayedMessage}</div>
          )}

          {showSlider && (
            <div className="message-slider">
              <input
                type="range"
                min={0}
                max={allTransitions.length - 1}
                value={slideIndex}
                onChange={(e) => {
                  const index = Number(e.target.value);
                  setSlideIndex(index);
                  sliderRef.current.slickGoTo(index);
                }}
              />
              <Slider ref={sliderRef} {...settings}>
                {allTransitions.map((transition, index) => (
                  <div key={index} className="message mt-4">
                    <h5 className="transition-title">{transition.title}</h5>
                    <p className="transition-weeks text-muted fs-6">
                      Weeks: {transition.minWeeks}-{transition.maxWeeks}
                    </p>
                    <p className="transition-description">{transition.description}</p>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-5 py-3">
        <p>Crafted with ❤️ by ntemposd</p>
      </footer>
    </div>
  );
}

export default BabyWeeksCalculator;
