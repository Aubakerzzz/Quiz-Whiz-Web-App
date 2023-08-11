import { useEffect } from 'react';

export const useTimer = (timeRemaining, quizExpired, setTimeRemaining, setQuizExpired) => {
  useEffect(() => {
    if (timeRemaining > 0 && !quizExpired) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    } else {
      setQuizExpired(true);
    }
  }, [timeRemaining, quizExpired, setQuizExpired, setTimeRemaining]);
};
