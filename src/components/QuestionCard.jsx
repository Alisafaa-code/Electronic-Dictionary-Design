import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, X, Volume2, Bookmark } from "lucide-react";
import { Button } from "./ui/button";

const getTypeInfo = (type) => {
  switch (type) {
    case "synonym":
      return { label: "Synonym", color: "bg-blue-500", emoji: "🔄" };
    case "antonym":
      return { label: "Antonym", color: "bg-orange-500", emoji: "⚖️" };
    case "usage":
      return { label: "Word Usage", color: "bg-green-500", emoji: "📝" };
    default:
      return { label: "Question", color: "bg-gray-500", emoji: "❓" };
  }
};

const getDifficultyInfo = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return { label: "Easy", color: "bg-green-500", emoji: "⭐" };
    case "medium":
      return { label: "Medium", color: "bg-yellow-500", emoji: "⚡" };
    case "hard":
      return { label: "Hard", color: "bg-red-500", emoji: "🏆" };
    default:
      return { label: "Unknown", color: "bg-gray-500", emoji: "❓" };
  }
};

export function QuestionCard({
  question,
  selectedAnswer,
  answered,
  showExplanation,
  onAnswerSelect,
  onPronounce,
  onToggleBookmark,
  isBookmarked,
}) {
  const typeInfo = getTypeInfo(question.type);
  const difficultyInfo = getDifficultyInfo(question.difficulty);

  return (
    <Card className="p-8 shadow-2xl border-none bg-white">
      {/* Question Type Badge */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Badge className={`${typeInfo.color} text-white px-4 py-1`}>
            {typeInfo.emoji} {typeInfo.label}
          </Badge>
          <Badge className={`${difficultyInfo.color} text-white px-4 py-1`}>
            {difficultyInfo.emoji} {difficultyInfo.label}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggleBookmark(question.word)}
          className={`${
            isBookmarked
              ? "bg-purple-100 border-purple-400 text-purple-700"
              : "border-gray-300"
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-purple-600" : ""}`}
          />
        </Button>
      </div>

      {/* Word being learned */}
      <div className="mb-6">
        <p className="text-gray-600 mb-2">Word:</p>
        <div className="flex items-center gap-3">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg">
            {question.word}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPronounce(question.word)}
            className="border-purple-300 hover:bg-purple-50"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-gray-800 mb-8">{question.question}</h2>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = answered && isCorrect;
          const showIncorrect = answered && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={answered}
              className={`
                p-4 rounded-xl border-2 text-left transition-all duration-200
                ${
                  !answered &&
                  "hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
                }
                ${answered && "cursor-not-allowed"}
                ${!answered && isSelected && "border-purple-500 bg-purple-50"}
                ${showCorrect && "border-green-500 bg-green-50"}
                ${showIncorrect && "border-red-500 bg-red-50"}
                ${
                  !isSelected &&
                  !showCorrect &&
                  !showIncorrect &&
                  "border-gray-200"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`
                  ${showCorrect && "text-green-700"}
                  ${showIncorrect && "text-red-700"}
                  ${!showCorrect && !showIncorrect && "text-gray-800"}
                `}
                >
                  {option}
                </span>
                {showCorrect && (
                  <div className="flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-green-600">Correct!</span>
                  </div>
                )}
                {showIncorrect && (
                  <div className="flex items-center gap-2">
                    <X className="w-6 h-6 text-red-600" />
                    <span className="text-red-600">Incorrect</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <div
          className={`
          p-4 rounded-xl border-2 
          ${
            selectedAnswer === question.correctAnswer
              ? "bg-green-50 border-green-200"
              : "bg-blue-50 border-blue-200"
          }
        `}
        >
          <p className="text-gray-700">
            <span className="mr-2">💡</span>
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}
    </Card>
  );
}
