import { useState, useEffect } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { ScoreBoard } from "./components/ScoreBoard";
import { DifficultySelector } from "./components/DifficultySelector";
import { BookmarkedWords } from "./components/BookmarkedWords";
import { Button } from "./components/ui/button";
import { BookOpen, RefreshCw } from "lucide-react";

const questionBank = [
  // EASY - Synonym questions
  {
    id: 1,
    type: "synonym",
    word: "happy",
    question: 'Which word is a synonym for "happy"?',
    options: ["sad", "joyful", "angry", "tired"],
    correctAnswer: 1,
    explanation:
      '"Joyful" means the same as happy - feeling great pleasure and delight!',
    difficulty: "easy",
  },
  {
    id: 2,
    type: "synonym",
    word: "big",
    question: 'Which word means the same as "big"?',
    options: ["tiny", "large", "small", "short"],
    correctAnswer: 1,
    explanation: '"Large" is a synonym of big - both mean having great size!',
    difficulty: "easy",
  },
  {
    id: 3,
    type: "synonym",
    word: "fast",
    question: 'Which word means the same as "fast"?',
    options: ["slow", "quick", "heavy", "light"],
    correctAnswer: 1,
    explanation:
      '"Quick" is a synonym of fast - both mean moving or happening rapidly!',
    difficulty: "easy",
  },
  // EASY - Antonym questions
  {
    id: 4,
    type: "antonym",
    word: "hot",
    question: 'Which word is an antonym (opposite) of "hot"?',
    options: ["warm", "cold", "heat", "fire"],
    correctAnswer: 1,
    explanation: '"Cold" is the opposite of hot - they are antonyms!',
    difficulty: "easy",
  },
  {
    id: 5,
    type: "antonym",
    word: "tall",
    question: 'Which word is the opposite of "tall"?',
    options: ["high", "short", "big", "long"],
    correctAnswer: 1,
    explanation:
      '"Short" is the antonym of tall - they describe opposite heights!',
    difficulty: "easy",
  },
  // EASY - Usage questions
  {
    id: 6,
    type: "usage",
    word: "excited",
    question: 'Which sentence uses the word "excited" correctly?',
    options: [
      "The water is very excited.",
      "I am excited about my birthday party!",
      "The chair looks excited.",
      "The book is excited to read.",
    ],
    correctAnswer: 1,
    explanation: "People feel excited about things they look forward to!",
    difficulty: "easy",
  },
  {
    id: 7,
    type: "usage",
    word: "beautiful",
    question: 'Which sentence uses "beautiful" correctly?',
    options: [
      "The sunset was beautiful.",
      "I beautiful to school.",
      "He beautiful the ball.",
      "They are beautiful running.",
    ],
    correctAnswer: 0,
    explanation:
      '"Beautiful" describes something that looks lovely or pleasing!',
    difficulty: "easy",
  },
  // MEDIUM - Synonym questions
  {
    id: 8,
    type: "synonym",
    word: "smart",
    question: 'Which word is a synonym for "smart"?',
    options: ["clever", "silly", "slow", "lazy"],
    correctAnswer: 0,
    explanation:
      '"Clever" means the same as smart - being intelligent and quick to understand!',
    difficulty: "medium",
  },
  {
    id: 9,
    type: "synonym",
    word: "courageous",
    question: 'Which word is a synonym for "courageous"?',
    options: ["fearful", "brave", "timid", "weak"],
    correctAnswer: 1,
    explanation:
      '"Brave" means the same as courageous - showing no fear in difficult situations!',
    difficulty: "medium",
  },
  {
    id: 10,
    type: "synonym",
    word: "ancient",
    question: 'Which word means the same as "ancient"?',
    options: ["new", "modern", "old", "recent"],
    correctAnswer: 2,
    explanation:
      '"Old" is a synonym of ancient - both refer to something from long ago!',
    difficulty: "medium",
  },
  // MEDIUM - Antonym questions
  {
    id: 11,
    type: "antonym",
    word: "easy",
    question: 'Which word means the opposite of "easy"?',
    options: ["simple", "difficult", "clear", "soft"],
    correctAnswer: 1,
    explanation:
      '"Difficult" is the opposite of easy - it means hard or challenging!',
    difficulty: "medium",
  },
  {
    id: 12,
    type: "antonym",
    word: "brave",
    question: 'Which word is an antonym of "brave"?',
    options: ["fearful", "strong", "bold", "heroic"],
    correctAnswer: 0,
    explanation:
      '"Fearful" is the opposite of brave - being afraid versus being courageous!',
    difficulty: "medium",
  },
  {
    id: 13,
    type: "antonym",
    word: "generous",
    question: 'Which word is the opposite of "generous"?',
    options: ["kind", "selfish", "giving", "helpful"],
    correctAnswer: 1,
    explanation:
      '"Selfish" is the opposite of generous - thinking only of yourself versus being giving!',
    difficulty: "medium",
  },
  // MEDIUM - Usage questions
  {
    id: 14,
    type: "usage",
    word: "quietly",
    question: 'Which sentence uses "quietly" correctly?',
    options: [
      "The cat is very quietly.",
      "She walked quietly into the room.",
      "The quietly is on the table.",
      "He has a quietly book.",
    ],
    correctAnswer: 1,
    explanation:
      '"Quietly" describes doing something without making much noise!',
    difficulty: "medium",
  },
  {
    id: 15,
    type: "usage",
    word: "curious",
    question: 'Which sentence uses "curious" correctly?',
    options: [
      "The water is curious.",
      "The curious walked home.",
      "The child was curious about the stars.",
      "I curious my homework.",
    ],
    correctAnswer: 2,
    explanation: '"Curious" means wanting to learn or know about something!',
    difficulty: "medium",
  },
  // HARD - Synonym questions
  {
    id: 16,
    type: "synonym",
    word: "magnificent",
    question: 'Which word is a synonym for "magnificent"?',
    options: ["ordinary", "splendid", "plain", "simple"],
    correctAnswer: 1,
    explanation:
      '"Splendid" means the same as magnificent - both describe something impressively beautiful!',
    difficulty: "hard",
  },
  {
    id: 17,
    type: "synonym",
    word: "persistent",
    question: 'Which word means the same as "persistent"?',
    options: ["determined", "lazy", "careless", "quick"],
    correctAnswer: 0,
    explanation:
      '"Determined" is a synonym of persistent - continuing firmly despite difficulties!',
    difficulty: "hard",
  },
  {
    id: 18,
    type: "synonym",
    word: "abundant",
    question: 'Which word is a synonym for "abundant"?',
    options: ["scarce", "rare", "plentiful", "limited"],
    correctAnswer: 2,
    explanation:
      '"Plentiful" means the same as abundant - existing in large quantities!',
    difficulty: "hard",
  },
  // HARD - Antonym questions
  {
    id: 19,
    type: "antonym",
    word: "genuine",
    question: 'Which word is an antonym of "genuine"?',
    options: ["real", "fake", "true", "authentic"],
    correctAnswer: 1,
    explanation: '"Fake" is the opposite of genuine - not real or authentic!',
    difficulty: "hard",
  },
  {
    id: 20,
    type: "antonym",
    word: "triumph",
    question: 'Which word is the opposite of "triumph"?',
    options: ["victory", "success", "defeat", "win"],
    correctAnswer: 2,
    explanation: '"Defeat" is the opposite of triumph - losing versus winning!',
    difficulty: "hard",
  },
  // HARD - Usage questions
  {
    id: 21,
    type: "usage",
    word: "reluctant",
    question: 'Which sentence uses "reluctant" correctly?',
    options: [
      "She was reluctant to speak in front of the class.",
      "The reluctant is on the shelf.",
      "He reluctant to the store.",
      "They are very reluctant today.",
    ],
    correctAnswer: 0,
    explanation: '"Reluctant" means unwilling or hesitant to do something!',
    difficulty: "hard",
  },
  {
    id: 22,
    type: "usage",
    word: "diligent",
    question: 'Which sentence uses "diligent" correctly?',
    options: [
      "The diligent is broken.",
      "She was a diligent student who studied every day.",
      "I diligent my homework.",
      "The tree is diligent.",
    ],
    correctAnswer: 1,
    explanation: '"Diligent" describes someone who works hard and carefully!',
    difficulty: "hard",
  },
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [bookmarkedWords, setBookmarkedWords] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wordmaster-bookmarks");
    if (saved) {
      try {
        setBookmarkedWords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load bookmarks", e);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "wordmaster-bookmarks",
      JSON.stringify(bookmarkedWords)
    );
  }, [bookmarkedWords]);

  useEffect(() => {
    shuffleQuestions(selectedDifficulty);
  }, [selectedDifficulty]);

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

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    shuffleQuestions(selectedDifficulty);
  };

  const handlePronounce = (word) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const handleToggleBookmark = (word) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCurrentlyBookmarked = bookmarkedWords.some(
      (bw) => bw.word === word
    );

    if (isCurrentlyBookmarked) {
      setBookmarkedWords(bookmarkedWords.filter((bw) => bw.word !== word));
    } else {
      setBookmarkedWords([
        ...bookmarkedWords,
        {
          word: currentQuestion.word,
          type: currentQuestion.type,
          difficulty: currentQuestion.difficulty,
        },
      ]);
    }
  };

  const handleRemoveBookmark = (word) => {
    setBookmarkedWords(bookmarkedWords.filter((bw) => bw.word !== word));
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizComplete =
    currentQuestionIndex === questions.length - 1 && answered;
  const isCurrentWordBookmarked = bookmarkedWords.some(
    (bw) => bw.word === currentQuestion.word
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-10 h-10 text-purple-600" />
            <h1 className="text-purple-800">Word Master Dictionary</h1>
          </div>
          <p className="text-gray-700">
            Learn synonyms, antonyms, and word usage!
          </p>
        </div>

        {/* Difficulty Selector */}
        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={handleDifficultyChange}
        />

        {/* Bookmarked Words */}
        <BookmarkedWords
          bookmarkedWords={bookmarkedWords}
          onRemoveBookmark={handleRemoveBookmark}
          onPronounce={handlePronounce}
        />

        {/* Score Board */}
        <ScoreBoard
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          score={score}
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          answered={answered}
          showExplanation={showExplanation}
          onAnswerSelect={handleAnswerSelect}
          onPronounce={handlePronounce}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isCurrentWordBookmarked}
        />

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {answered && !isQuizComplete && (
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next Question →
            </Button>
          )}

          {isQuizComplete && (
            <div className="text-center w-full">
              <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
                <h2 className="text-green-600 mb-4">🎉 Quiz Complete! 🎉</h2>
                <p className="text-gray-700 mb-2">
                  You scored {score} out of {questions.length}
                </p>
                <p className="text-gray-600">
                  {score === questions.length
                    ? "Perfect score! You're a Word Master! 🌟"
                    : score >= questions.length * 0.8
                    ? "Great job! Keep up the excellent work! 👏"
                    : score >= questions.length * 0.6
                    ? "Good effort! Practice makes perfect! 💪"
                    : "Keep learning! You're doing great! 📚"}
                </p>
              </div>
              <Button
                onClick={handleRestart}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
