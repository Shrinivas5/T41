import React, { useState, useEffect } from 'react';
import './App.css';

// Sample question bank - you can replace this with your own questions
const questionBank = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  // Add more questions as needed
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState(new Set());

  // Initialize quiz
  useEffect(() => {
    setQuestions(questionBank);
    getRandomQuestion();
  }, []);

  // Get a random question that hasn't been used recently
  const getRandomQuestion = () => {
    const availableQuestions = questions.filter(
      (_, index) => !usedQuestions.has(index)
    );

    if (availableQuestions.length === 0) {
      setShowScore(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = questions.indexOf(availableQuestions[randomIndex]);
    
    setCurrentQuestion(availableQuestions[randomIndex]);
    setUsedQuestions(prev => new Set([...prev, questionIndex]));
  };

  // Handle answer selection
  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    getRandomQuestion();
  };

  // Reset quiz
  const resetQuiz = () => {
    setScore(0);
    setShowScore(false);
    setUsedQuestions(new Set());
    getRandomQuestion();
  };

  return (
    <div className="App">
      <h1>Random Quiz</h1>
      
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} out of {questions.length}</p>
          <button onClick={resetQuiz}>Try Again</button>
        </div>
      ) : currentQuestion ? (
        <div className="question-section">
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          <p>Score: {score}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
