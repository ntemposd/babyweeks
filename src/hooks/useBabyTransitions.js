import { useState, useEffect } from "react";
import { validateSelectedDate, findTransitions, formatMessage } from "../utils/utils";

export function useBabyTransitions(selectedDate, transitionsData) {
  const [weekDifference, setWeekDifference] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [allTransitions, setAllTransitions] = useState([]);
  const [lastSelectedDate, setLastSelectedDate] = useState(null);

  useEffect(() => {
    if (!selectedDate) {
      if (lastSelectedDate !== null) {
        console.log("No date selected. Resetting state.");
      }

      setLastSelectedDate(null);
      setWeekDifference(null);
      setDisplayedMessage(''); // Reset fallback message
      setAllTransitions([]);
      setCurrentMessageIndex(null);
      return;
    }

    if (selectedDate === lastSelectedDate) {
      return;
    }

    setLastSelectedDate(selectedDate);
    const today = new Date();

    const { isValid, weeks, message } = validateSelectedDate(selectedDate, today);

    if (!isValid) {
      console.log("Validation failed:", message);
      setWeekDifference(null);
      setDisplayedMessage(message); // Show fallback message for invalid dates
      setAllTransitions([]);
      setCurrentMessageIndex(null);
      return;
    }

    console.log("Validation succeeded. Weeks:", weeks);
    setWeekDifference(weeks);

    const { foundTransition, orderedTransitions, fallbackMessage } = findTransitions(
      weeks,
      transitionsData.transitions,
      selectedDate
    );

    setAllTransitions(orderedTransitions);

    if (foundTransition) {
      console.log("Found Transition:", foundTransition);
      setCurrentMessageIndex(orderedTransitions.indexOf(foundTransition));
      setDisplayedMessage(''); // Clear fallback message when transition exists
    } else {
      console.log("No Transition. Fallback Message:", fallbackMessage);
      setCurrentMessageIndex(null);
      setDisplayedMessage(fallbackMessage); // Show fallback message
    }
  }, [selectedDate, transitionsData, lastSelectedDate]);

  return {
    weekDifference,
    currentMessageIndex,
    displayedMessage,
    allTransitions,
    setCurrentMessageIndex,
  };
}
