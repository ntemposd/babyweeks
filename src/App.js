import React, { useState, useEffect } from 'react';
import './App.css';
import babyImage from './assets/baby-girl.svg';
import transitionsData from './assets/transitions.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage); // Preload the image

function BabyWeeksCalculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [weekDifference, setWeekDifference] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [allTransitions, setAllTransitions] = useState([]);

  // Pre-process transitions for efficiency
  const parsedTransitions = transitionsData.transitions.map(transition => {
    const [start, end] = transition.weeks.split('-').map(Number);
    return { ...transition, start, end };
  });

  // Function to calculate weeks since the selected date
  function calculateWeeks(selectedDate) {
    if (!selectedDate) return; // Safety check
    const today = new Date();
    const differenceInTime = today - selectedDate;
    const weeks = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));
    setWeekDifference(weeks);

    console.log("Weeks:", weeks); // Log the calculated weeks

    // Find matching transitions based on weeks
    const pastTransitions = parsedTransitions.filter(({ start, end }) => weeks >= start && weeks < start + (end ? end - start : 0));
    const currentTransitions = parsedTransitions.filter(({ start, end }) => weeks >= start && weeks <= end);
    const futureTransitions = parsedTransitions.filter(({ start }) => weeks < start);

    // Combine all transitions, ordered by start week
    const orderedTransitions = [
      ...pastTransitions,
      ...currentTransitions,
      ...futureTransitions
    ].sort((a, b) => a.start - b.start); // Sort by start week

    setAllTransitions(orderedTransitions);

    console.log("Ordered transitions:", orderedTransitions);

    // Set the first transition as the default one to display
    if (orderedTransitions.length > 0) {
      setCurrentMessageIndex(0); // Set to the first message when matches are found
    } else {
      setCurrentMessageIndex(null); // No matching message
      setDisplayedMessage('No specific message for this week range.');
    }
  }

  // Function to format and display transition message
  function formatMessage(transition) {
    return (
      <>
        <h5 className="transition-title">{transition.title}</h5> {/* Smaller Title */}
        <p className="transition-weeks text-muted fs-6">Week: {transition.weeks}</p> {/* Smaller Weeks */}
        <p className="transition-description">{transition.description}</p> {/* Regular Description */}
      </>
    );
  }

  // Navigate to the next or previous message
  function navigateMessage(direction) {
    console.log("Navigating... Current Index:", currentMessageIndex); // Debugging log

    if (!allTransitions || allTransitions.length === 0 || currentMessageIndex === null) return;

    // Calculate the new index based on direction
    setCurrentMessageIndex((prevIndex) => {
      let newIndex = prevIndex + direction;

      // Wrap the index around if it goes out of bounds
      if (newIndex < 0) newIndex = allTransitions.length - 1; // Wrap to the last message
      if (newIndex >= allTransitions.length) newIndex = 0; // Wrap to the first message

      console.log("New Index after navigation:", newIndex); // Debugging log
      return newIndex;
    });
  }

  // Effect to update the displayed message when the currentMessageIndex changes
  useEffect(() => {
    if (currentMessageIndex !== null && allTransitions.length > 0) {
      setDisplayedMessage(formatMessage(allTransitions[currentMessageIndex]));
    }
  }, [currentMessageIndex, allTransitions]); // Only re-run when the index or matching transitions change

  return (
    <div className="App">
      <header className="App-header bg-gradient">
        <div className="container pt-4 text-center">
          <img
            src={babyImage}
            className="App-logo"
            alt="Baby"
            width="160"
            height="160"
            style={{ width: '20vmin', height: 'auto' }}
          />
          <h1 className="display-4 fw-bold mt-1">Is This a Transition?</h1>
          <p className="fw-light mt-3 mb-4">
            Explore Your Baby’s Development <span className="material-icons">tips_and_updates</span> Know What to Expect
          </p>
        </div>
      </header>

      <div className="calculator mt-4 text-center">
        <label htmlFor="date"><h2 className="lead">Insert Birthdate</h2></label>

        <div className="input-wrapper">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              calculateWeeks(date); // Call calculateWeeks whenever the date is selected
            }}
            className="my-2 form-control text-center"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <p>
          Hooray! Your baby is <b>{weekDifference !== null ? weekDifference : ''}</b> weeks old
        </p>
        <div className={`message ${displayedMessage ? 'show' : ''}`}>
          {displayedMessage}
        </div>

        {/* Always show buttons */}
        {allTransitions.length > 0 && weekDifference !== null && (
          <div className="navigation mt-3">
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => navigateMessage(-1)} // Previous message
            >
              Previous
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigateMessage(1)} // Next message
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BabyWeeksCalculator;
