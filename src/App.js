import React, { useState, useEffect } from 'react';
import './App.css';

const questionsBank = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Shakespeare', 'Tolstoy', 'Homer', 'Dante'],
    answer: 'Shakespeare',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Jupiter',
  },
  {
    question: 'Which element has the chemical symbol O?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Zinc'],
    answer: 'Oxygen',
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [quizOver, setQuizOver] = useState(false);

  const getRandomQuestion = () => {
    const remainingQuestions = questionsBank.filter(
      (_, index) => !usedQuestions.includes(index)
    );

    if (remainingQuestions.length === 0) {
      setQuizOver(true);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const questionIndex = questionsBank.findIndex(
      q => q.question === remainingQuestions[randomIndex].question
    );

    setUsedQuestions([...usedQuestions, questionIndex]);
    return questionsBank[questionIndex];
  };

  useEffect(() => {
    const next = getRandomQuestion();
    setCurrentQuestion(next);
  }, []);

  const handleAnswer = (option) => {
    if (!currentQuestion) return;

    if (option === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${currentQuestion.answer}`);
    }

    setTimeout(() => {
      const next = getRandomQuestion();
      setCurrentQuestion(next);
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="App">
      <h1>🎯 Online Quiz</h1>

      {quizOver ? (
        <div>
          <h2>Quiz Over!</h2>
          <p>Your score: {score} / {questionsBank.length}</p>
        </div>
      ) : currentQuestion ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
          <p>{feedback}</p>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default App;
