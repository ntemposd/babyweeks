// Function to calculate weeks and time difference
export function calculateWeeks(selectedDate, today = new Date()) {
    const differenceInTime = today - selectedDate;
    const weeks = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));
    return { weeks, differenceInTime };
  }
  
  // Function to validate selected date and handle edge cases
  export function validateSelectedDate(selectedDate, today = new Date()) {
    const { weeks, differenceInTime } = calculateWeeks(selectedDate, today);
  
    if (differenceInTime < 0) {
      return {
        isValid: false,
        message: "Your baby is not born yet! Please select a valid date.",
      };
    }
  
    if (weeks > 52) {
      return {
        isValid: false,
        message: "Your baby is over a year old! This app focuses on development during the first year.",
      };
    }
  
    return { isValid: true, weeks };
  }
  
  
  // Function to find transitions and generate fallback messages
  export function findTransitions(weeks, transitionsData, selectedDate) {
    const orderedTransitions = [...transitionsData].sort((a, b) => a.minWeeks - b.minWeeks);
  
    // Find the current transition
    const foundTransition = orderedTransitions.find(
      ({ minWeeks, maxWeeks }) => weeks >= minWeeks && weeks <= maxWeeks
    );
  
    if (foundTransition) {
      console.log("Found Transition:", foundTransition);
      return {
        foundTransition,
        orderedTransitions,
        fallbackMessage: '', // No fallback needed
        nextLeap: null,
        previousLeap: null,
      };
    }
  
    // Determine next and previous leaps
    const previousLeap = orderedTransitions
      .filter(({ maxWeeks }) => weeks > maxWeeks)
      .sort((a, b) => b.maxWeeks - a.maxWeeks)[0];
  
    const nextLeap = orderedTransitions
      .filter(({ minWeeks }) => weeks < minWeeks)
      .sort((a, b) => a.minWeeks - b.minWeeks)[0];
  
    // Generate fallback message
    const fallbackMessage = generateFallbackMessage(weeks, previousLeap, nextLeap, selectedDate);
  
    console.log("No Transition. Fallback Message:", fallbackMessage);
    return { foundTransition: null, orderedTransitions, fallbackMessage, nextLeap, previousLeap };
  }
  
  // Function to generate fallback message for "no transition" periods
  export function generateFallbackMessage(weeks, previousLeap, nextLeap, selectedDate) {
    if (nextLeap) {
      const nextLeapStartDate = new Date(selectedDate.getTime() + nextLeap.minWeeks * 7 * 24 * 60 * 60 * 1000);
      const daysUntilNextLeap = Math.ceil((nextLeapStartDate - new Date()) / (1000 * 60 * 60 * 24));
      return `You are all set, your baby is growing but no transition happens right now. The next leap starts at week ${nextLeap.minWeeks}, ${daysUntilNextLeap} days from today.`;
    }
  
    if (previousLeap) {
      return "Your baby has completed all leaps! Celebrate their growth!";
    }
  
    return "You are all set, your baby is growing but no transition happens right now.";
  }
  
  // Function to format transition message
  export function formatMessage(transition) {
    if (!transition) {
      console.error("Invalid Transition Passed to formatMessage");
      return null;
    }
  
    console.log("Formatting Transition Message:", transition);
    return (
      <>
        <h5 className="transition-title">{transition.title}</h5>
        <p className="transition-weeks text-muted fs-6">
          Weeks: {transition.minWeeks}-{transition.maxWeeks}
        </p>
        <p className="transition-description">{transition.description}</p>
      </>
    );
  }
  