import { useState, useEffect } from "react";

export function useQuizHistory() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(history));
  }, [history]);

  const addQuizResult = (result) => {
    const newResult = {
      ...result,
      date: new Date().toISOString(),
      id: Date.now(),
    };
    setHistory((prev) => [newResult, ...prev].slice(0, 50)); // Keep last 50 attempts
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("quizHistory");
  };

  return { history, addQuizResult, clearHistory };
}
