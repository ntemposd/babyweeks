import React, { useState, useEffect } from 'react';
import '../App.css';
import babyImage from '../assets/baby-girl.svg';
import transitionsData from '../assets/transitions.json';
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

  // Function to calculate weeks since the selected date
  function calculateWeeks(selectedDate) {
    if (!selectedDate) return; // Safety check
    const today = new Date();
    const differenceInTime = today - selectedDate;
    const weeks = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));

    // Check for future dates (baby not born yet)
    if (differenceInTime < 0) {
      setWeekDifference(null); // Clear any previous value
      setDisplayedMessage("Your baby is not born yet! Please select a valid date.");
      setAllTransitions([]); // Clear transitions
      setCurrentMessageIndex(null);
      return;
    }

    // Check if the baby is older than 1 year
    if (weeks > 52) {
      setWeekDifference(null); // Clear any previous value
      setDisplayedMessage(
        "Your baby is over a year old! This app focuses on development during the first year."
      );
      setAllTransitions([]); // Clear transitions
      setCurrentMessageIndex(null);
      return;
    }

    // If the date is valid, proceed with the calculation
    setWeekDifference(weeks);

    console.log("Weeks:", weeks); // Log the calculated weeks

    // Find the specific leap or interval
    let currentTransition = null;
    let genericMessage = null;

    const foundTransition = transitionsData.transitions.find(({ minWeeks, maxWeeks }) =>
      weeks >= minWeeks && weeks <= maxWeeks
    );

    if (foundTransition) {
      currentTransition = foundTransition;
    } else {
      // Handle intervals between leaps
      const previousLeap = transitionsData.transitions
        .filter(({ maxWeeks }) => weeks > maxWeeks)
        .sort((a, b) => b.maxWeeks - a.maxWeeks)[0]; // Find the last completed leap

      const nextLeap = transitionsData.transitions
        .filter(({ minWeeks }) => weeks < minWeeks)
        .sort((a, b) => a.minWeeks - b.minWeeks)[0]; // Find the upcoming leap

      if (previousLeap && nextLeap) {
        genericMessage = `Your baby is growing steadily. Stay tuned for the next leap at week ${nextLeap.minWeeks}!`;
      } else if (!previousLeap && nextLeap) {
        // If no previous leap (baby is too young)
        genericMessage = `Your baby is growing steadily. The first leap starts at week ${nextLeap.minWeeks}.`;
      } else if (previousLeap && !nextLeap) {
        // If no next leap (baby is older than last leap)
        genericMessage = "Your baby has completed all leaps! Celebrate their growth!";
      }
    }

    // Prepare the ordered list of transitions for navigation
    const orderedTransitions = [...transitionsData.transitions].sort(
      (a, b) => a.minWeeks - b.minWeeks
    );

    setAllTransitions(orderedTransitions);

    // Set the default displayed message
    if (currentTransition) {
      setCurrentMessageIndex(orderedTransitions.indexOf(currentTransition));
    } else {
      setCurrentMessageIndex(null); // No specific leap
      setDisplayedMessage(genericMessage);
    }

    console.log("Ordered transitions:", orderedTransitions);
  }

  // Function to format and display transition message
  function formatMessage(transition) {
    return (
      <>
        <h5 className="transition-title">{transition.title}</h5> {/* Smaller Title */}
        <p className="transition-weeks text-muted fs-6">
          Weeks: {transition.minWeeks}-{transition.maxWeeks}
        </p> {/* Smaller Weeks */}
        <p className="transition-description">{transition.description}</p> {/* Regular Description */}
      </>
    );
  }

  // Navigate to the next or previous message
  function navigateMessage(direction) {
    console.log("Navigating... Current Index:", currentMessageIndex);

    if (!allTransitions || allTransitions.length === 0) return;

    setCurrentMessageIndex((prevIndex) => {
      let newIndex = prevIndex + direction;

      if (newIndex < 0) newIndex = allTransitions.length - 1; // Wrap to the last message
      if (newIndex >= allTransitions.length) newIndex = 0; // Wrap to the first message

      console.log("New Index after navigation:", newIndex);
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
    <div className="App text-center">
      <header className="App-header">
        <div className="container pt-4">
          <img
            src={babyImage}
            className="App-logo"
            alt="Baby"
            width="160"
            height="160"
            style={{ width: '20vmin', height: 'auto' }}
          />
          <h1 className="fw-bold">Growth Leaps</h1>
          <h6 className="fw-bold">Testing GH Actions</h6>
          <p className="fw-light mt-1"><span className="material-icons">tips_and_updates</span> Explore Your Infant's Development <span className="material-icons">tips_and_updates</span></p>
        </div>
        {/* Add the SVG line here */}
        <svg height="1" width="100%" className="header-line">
          <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
        </svg>
      </header>

      <div className="calculator">
        <label htmlFor="date">Insert Birthdate</label>
        <span className="material-icons-outlined display-6">south</span>
        <div className="input-wrapper">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              calculateWeeks(date); // Call calculateWeeks whenever the date is selected
            }}
            className="my-2 form-control text-center lead"
            dateFormat="yyyy-MM-dd"
          />
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
        <div className={`message ${displayedMessage ? 'show' : ''}`}>
          {displayedMessage}
        </div>
      </div>
    </div>
  );
}

export default BabyWeeksCalculator;
