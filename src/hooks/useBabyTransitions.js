import { useState, useEffect } from "react";
import { validateSelectedDate, findTransitions, formatMessage } from "../utils/utils";

export function useBabyTransitions(selectedDate, transitionsData) {
  const [weekDifference, setWeekDifference] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [allTransitions, setAllTransitions] = useState([]);
  const [lastSelectedDate, setLastSelectedDate] = useState(null);

  useEffect(() => {
    if (!selectedDate || selectedDate === lastSelectedDate) return;
  
    setLastSelectedDate(selectedDate);
  
    const today = new Date();
    const { isValid, weeks, message } = validateSelectedDate(selectedDate, today);
  
    if (!isValid) {
      if (process.env.NODE_ENV === 'development') {
        console.log("Validation failed:", message);
      }
      setWeekDifference(null);
      setDisplayedMessage(message);
      setAllTransitions([]);
      setCurrentMessageIndex(null);
      return;
    }
  
    if (process.env.NODE_ENV === 'development') {
      console.log("Validation succeeded. Weeks:", weeks);
    }
    setWeekDifference(weeks);
  
    const { foundTransition, orderedTransitions, fallbackMessage } = findTransitions(
      weeks,
      transitionsData.transitions,
      selectedDate
    );
  
    setAllTransitions(orderedTransitions);
    setCurrentMessageIndex(foundTransition ? orderedTransitions.indexOf(foundTransition) : null);
    setDisplayedMessage(foundTransition ? '' : fallbackMessage);
  }, [selectedDate, transitionsData]);
  
  

  return {
    weekDifference,
    currentMessageIndex,
    displayedMessage,
    allTransitions,
    setCurrentMessageIndex,
  };
}
