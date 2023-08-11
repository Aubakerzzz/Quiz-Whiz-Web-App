import "bootstrap/dist/css/bootstrap.min.css";
import "./Mycss.css";
import TickingClock from "./component/TickingClock";
import React, {useEffect } from "react";
import {useQuizState} from './component/States';
import { quizzes } from "./component/quizesData";


function App() {
  const {
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
  } = useQuizState();


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
  

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedOptionIndex === quizzes[quizIndex].correctOptionIndex) {
      setScore((prevScore) => prevScore + 1);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < quizzes.length) {
      setQuizIndex((prevIndex) => prevIndex + 1);
      setQuizExpired(false);
      setTimeRemaining(60);
      setSelectedOptionIndex(-1);
      setQuizSubmitted(false);
    } else {
      setQuizExpired(false);
      setQuizSubmitted(true);
    }
  };
  
  const handleStartQuiz = () => {
    setQuizIndex(0);
    setQuizExpired(false);
    setTimeRemaining(60);
    setSelectedOptionIndex(-1);
    setQuizSubmitted(false);
    setShowInstructions(false);
  };

  return (
    <div className="container">
      {showInstructions ? (
        <div className="quiz-container">
          <h2 className="quiz-title">Quiz Instructions</h2>
          <p className="quiz-message">
            This quiz consists of multiple-choice questions. You will have 60
            seconds to answer each question. Once you submit an answer, you
            cannot change it. Good luck!
          </p>
          <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false); // Reset the error when input changes
            }}
            className={`input-field colorful-border ${nameError && "error"}`}
          />
          {nameError && <p className="error-message">Enter Name</p>}
          <input
            type="text"
            placeholder="Roll Number i.e (17I-1234)"
            value={rollNumber}
            onChange={(e) => {
              setRollNumber(e.target.value);
              setRollNumberError(false); // Reset the error when input changes
            }}
            className={`input-field colorful-border ${
              rollNumberError && "error"
            }`}
          />
          {rollNumberError && (
            <p className="error-message">
              Enter Roll Number in format 21I-XXXX
            </p>
          )}
          </div>
          <button
            className={`quiz-submit ${
              (!name ||
                !rollNumber ||
                !/^\d{2}[A-Z]-\d{4}$/.test(rollNumber)) &&
              "disabled"
            }`}
            onClick={() => {
              if (!name) {
                setNameError(true);
              }
              if (!rollNumber) {
                setRollNumberError(true);
              } else if (!/^\d{2}[A-Z]-\d{4}$/.test(rollNumber)) {
                setRollNumberError(true);
              }
              if (name && rollNumber && /^\d{2}[A-Z]-\d{4}$/.test(rollNumber)) {
                handleStartQuiz();
              }
            }}
            disabled={
              !name || !rollNumber || !/^\d{2}[A-Z]-\d{4}$/.test(rollNumber)
            }
          >
            Start Quiz
          </button>
        </div>
      ) : quizExpired ? (
        <div className="quiz-container">
          <p className="red-text">MCQ Expired!</p>
          <button className="quiz-next" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      ) : !quizExpired && quizIndex < quizzes.length && !quizSubmitted ? (
        <div className="quiz-container">
          <h2 className="quiz-title">Question {quizIndex + 1}</h2>
          <p className="quiz-submit">{quizzes[quizIndex].question}</p>
          <ul className="quiz-options">
            {quizzes[quizIndex].options.map((option, index) => (
              <li key={index} className="quiz-option">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="quizOption"
                  value={option}
                  onChange={() => handleOptionSelect(index)}
                  checked={selectedOptionIndex === index}
                  disabled={quizSubmitted}
                />
                <label htmlFor={`option${index}`} className="quiz-option-label">
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <TickingClock timeRemaining={timeRemaining} />
          <button
            className="quiz-submit"
            onClick={handleSubmitQuiz}
            disabled={isSubmitDisabled}
          >
            Submit MCQ
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          {quizIndex + 1 < quizzes.length && (
            <p className="quiz-message">Click to Open Next MCQ</p>
          )}
          {quizIndex + 1 >= quizzes.length && quizSubmitted && (
            <div>
              <p className="quiz-message">Quiz Finished!</p>
              <p className="quiz-message">Your Score: {score} / {quizzes.length}</p>
            </div>
          )}
          {quizIndex + 1 < quizzes.length && (
            <button className="quiz-next" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
