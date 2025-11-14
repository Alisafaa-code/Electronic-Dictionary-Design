import { useState } from "react";
import { Header } from "./components/Header";
import { QuestionCard } from "./components/QuestionCard";
import { ScoreBoard } from "./components/ScoreBoard";
import { DifficultySelector } from "./components/DifficultySelector";
import { BookmarkedWords } from "./components/BookmarkedWords";
import { NavigationButtons } from "./components/NavigationButtons";
import { HistoryDashboard } from "./components/HistoryDashboard";
import { Timer } from "./components/Timer";
import { BookOpen, Volume2, VolumeX, Clock } from "lucide-react";
import { useQuiz } from "./hooks/useQuiz";
import { useBookmarks } from "./hooks/useBookmarks";
import { useTheme } from "./hooks/useTheme";
import { useQuizHistory } from "./hooks/useQuizHistory";
import { pronounceWord } from "./utils/speech";
import {
  playCorrectSound,
  playWrongSound,
  playCompletionSound,
} from "./utils/sounds";
import "./App.css";

export default function App() {
  const {
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
  } = useQuiz();

  const { bookmarkedWords, toggleBookmark, removeBookmark, isBookmarked } =
    useBookmarks();

  const { isDark, toggleTheme } = useTheme();
  const { history, addQuizResult, clearHistory } = useQuizHistory();

  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);

  const handleToggleBookmark = (word) => {
    toggleBookmark(word, currentQuestion);
  };

  const handleSelectAnswer = (answer) => {
    const isCorrect = selectAnswer(answer);

    // Play sound effect
    if (soundEnabled) {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }

    // Pause timer when answered
    if (timerEnabled) {
      setTimerPaused(true);
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setTimerPaused(false);
  };

  const handleRestart = () => {
    // Save quiz result to history
    if (isQuizComplete) {
      addQuizResult({
        score,
        totalQuestions: questions.length,
        difficulty: selectedDifficulty,
      });

      if (soundEnabled) {
        playCompletionSound();
      }
    }

    restart();
    setTimerPaused(false);
  };

  const handleTimeout = () => {
    if (!answered) {
      selectAnswer(null); // Auto-submit with no answer

      // Auto-advance to next question after timeout
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          handleNextQuestion();
        }
      }, 1500);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400 animate-pulse" />
          <p className="text-gray-900 dark:text-white">جاري تحميل الأسئلة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onShowHistory={() => setShowHistory(true)}
        />

        {/* Settings Bar */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
            title={soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت"}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-green-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {soundEnabled ? "الصوت مفعّل" : "الصوت معطّل"}
            </span>
          </button>

          <button
            onClick={() => setTimerEnabled(!timerEnabled)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
            title={timerEnabled ? "إيقاف المؤقت" : "تشغيل المؤقت"}
          >
            <Clock
              className={`w-5 h-5 ${
                timerEnabled ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {timerEnabled ? "مؤقت مفعّل" : "مؤقت معطّل"}
            </span>
          </button>
        </div>

        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={changeDifficulty}
        />

        <BookmarkedWords
          bookmarkedWords={bookmarkedWords}
          onRemoveBookmark={removeBookmark}
          onPronounce={pronounceWord}
        />

        <ScoreBoard
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          score={score}
        />

        {/* Timer */}
        {timerEnabled && !isQuizComplete && (
          <div className="mb-6">
            <Timer
              key={currentQuestionIndex}
              duration={20}
              onTimeout={handleTimeout}
              isPaused={timerPaused || answered}
            />
          </div>
        )}

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          answered={answered}
          showExplanation={showExplanation}
          onAnswerSelect={handleSelectAnswer}
          onPronounce={pronounceWord}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked(currentQuestion.word)}
        />

        <NavigationButtons
          answered={answered}
          isQuizComplete={isQuizComplete}
          score={score}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
          onRestart={handleRestart}
        />

        {/* History Dashboard Modal */}
        {showHistory && (
          <HistoryDashboard
            history={history}
            onClose={() => setShowHistory(false)}
            onClear={() => {
              if (confirm("هل أنت متأكد من مسح السجل؟")) {
                clearHistory();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
