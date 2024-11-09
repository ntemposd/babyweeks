import React, { useState } from 'react';
import './App.css';  // Optional: Use this for custom styles if needed
import babyImage from './assets/baby-girl.svg'; // Import the image
import transitionsData from './assets/transitions.json';  // Import the transitions data
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BabyWeeksCalculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [weekDifference, setWeekDifference] = useState(null);  // Declare weekDifference state
  const [message, setMessage] = useState('');  // Declare message state

  // Function to calculate weeks since the selected date
  function calculateWeeks(date) {
    const inputDate = new Date(date);  // Get the selected date
    const today = new Date();
    const differenceInTime = today - inputDate;
    const weeks = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));  // Calculate weeks
    setWeekDifference(weeks);  // Set the week difference
    showMessage(weeks);  // Display message based on week range
  }

  // Function to set message based on week range, loading content from JSON
  function showMessage(weeks) {
    const transition = transitionsData.transitions.find((transition) => {
      const [start, end] = transition.weeks.split('-').map(Number);  // Ensure proper conversion to numbers
      if (end) {
        return weeks >= start && weeks <= end;  // Check for range
      }
      return weeks === start;  // Handle single-week transitions (like 12 weeks)
    });

    if (transition) {
      setMessage(transition.description);  // Set the description from the matching transition
    } else {
      setMessage("No specific message for this week range.");
    }
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <div className="container text-center">
          {/* Baby Image and Title */}
          <img src={babyImage} className="App-logo" alt="Baby" style={{ width: '100px', height: 'auto' }} />
          <h1 className="display-5 fw-bold logo mt-2">How young is my baby?</h1>
          <p className="small fw-light mt-3 mb-5">
            Calculate the <mark>week</mark> of your <span className="material-icons">child_care</span> growing cycle;
            <span className="material-icons">tips_and_updates</span> realize 1st year's transitions.
          </p>
        </div>
      </header>

      {/* Calculator Section */}
      <div className="calculator mt-4 text-center">
        <label htmlFor="date"><h2>Insert Birthdate</h2></label>
        <div className="input-wrapper">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);  // Update startDate when a date is selected
              calculateWeeks(date);  // Call calculateWeeks with the selected date
            }}
            className="my-2 form-control"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <p className="fw-bold">
          Weeks since selected date: {weekDifference !== null ? weekDifference : ''}
        </p>
        <p className={`message ${message ? 'show' : ''}`}>{message}</p>
      </div>
    </div>
  );
}

export default BabyWeeksCalculator;
