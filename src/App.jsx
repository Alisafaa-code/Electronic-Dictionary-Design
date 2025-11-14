import { Header } from "./components/Header";
import { QuestionCard } from "./components/QuestionCard";
import { ScoreBoard } from "./components/ScoreBoard";
import { DifficultySelector } from "./components/DifficultySelector";
import { BookmarkedWords } from "./components/BookmarkedWords";
import { NavigationButtons } from "./components/NavigationButtons";
import { BookOpen } from "lucide-react";
import { useQuiz } from "./hooks/useQuiz";
import { useBookmarks } from "./hooks/useBookmarks";
import { pronounceWord } from "./utils/speech";
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

  const handleToggleBookmark = (word) => {
    toggleBookmark(word, currentQuestion);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p>جاري تحميل الأسئلة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
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

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          answered={answered}
          showExplanation={showExplanation}
          onAnswerSelect={selectAnswer}
          onPronounce={pronounceWord}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked(currentQuestion.word)}
        />

        <NavigationButtons
          answered={answered}
          isQuizComplete={isQuizComplete}
          score={score}
          totalQuestions={questions.length}
          onNext={nextQuestion}
          onRestart={restart}
        />
      </div>
    </div>
  );
}
