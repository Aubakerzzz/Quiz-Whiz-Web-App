import { useState } from 'react';

export const useQuizState = () => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizExpired, setQuizExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const isSubmitDisabled = selectedOptionIndex === -1 && timeRemaining > 0;
  const [showInstructions, setShowInstructions] = useState(true);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [nameError, setNameError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);

  return {
    quizIndex,
    setQuizIndex,
    quizExpired,
    setQuizExpired,
    timeRemaining,
    setTimeRemaining,
    selectedOptionIndex,
    setSelectedOptionIndex,
    quizSubmitted,
    setQuizSubmitted,
    isSubmitDisabled,
    showInstructions,
    setShowInstructions,
    score,
    setScore,
    name,
    setName,
    rollNumber,
    setRollNumber,
    nameError,
    setNameError,
    rollNumberError,
    setRollNumberError
  };
};
