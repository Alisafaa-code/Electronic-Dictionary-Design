import { useState, useEffect } from "react";
import questionBank from "../questionBank.json";

export function useQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const shuffleQuestions = (difficulty) => {
    let filtered =
      difficulty === "all"
        ? questionBank
        : questionBank.filter((q) => q.difficulty === difficulty);

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    shuffleQuestions(selectedDifficulty);
  }, [selectedDifficulty]);

  const selectAnswer = (answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const restart = () => {
    shuffleQuestions(selectedDifficulty);
  };

  const changeDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizComplete =
    currentQuestionIndex === questions.length - 1 && answered;

  return {
    currentQuestionIndex,
    score,
    answered,
    selectedAnswer,
    showExplanation,
    questions,
    selectedDifficulty,
    currentQuestion,
    isQuizComplete,
    selectAnswer,
    nextQuestion,
    restart,
    changeDifficulty,
  };
}
