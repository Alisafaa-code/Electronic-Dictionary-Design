import { Check, X, Volume2, Bookmark } from "lucide-react";

const getTypeInfo = (type) => {
  switch (type) {
    case "synonym":
      return { label: "مرادف", color: "bg-blue-500", emoji: "🔄" };
    case "antonym":
      return { label: "مضاد", color: "bg-orange-500", emoji: "⚖️" };
    case "usage":
      return { label: "استخدام الكلمة", color: "bg-green-500", emoji: "📝" };
    default:
      return { label: "سؤال", color: "bg-gray-500", emoji: "❓" };
  }
};

const getDifficultyInfo = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return { label: "سهل", color: "bg-green-500", emoji: "⭐" };
    case "medium":
      return { label: "متوسط", color: "bg-yellow-500", emoji: "⚡" };
    case "hard":
      return { label: "صعب", color: "bg-red-500", emoji: "🏆" };
    default:
      return { label: "غير معروف", color: "bg-gray-500", emoji: "❓" };
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
    <div className="p-8 shadow-2xl border-none bg-white rounded-xl flex flex-col gap-6">
      {/* Question Type Badge */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <span
            className={`${typeInfo.color} text-white px-4 py-1 inline-flex items-center justify-center rounded-md border border-transparent text-xs font-medium w-fit whitespace-nowrap`}
          >
            {typeInfo.emoji} {typeInfo.label}
          </span>
          <span
            className={`${difficultyInfo.color} text-white px-4 py-1 inline-flex items-center justify-center rounded-md border border-transparent text-xs font-medium w-fit whitespace-nowrap`}
          >
            {difficultyInfo.emoji} {difficultyInfo.label}
          </span>
        </div>
        <button
          onClick={() => onToggleBookmark(question.word)}
          className={`h-8 px-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 border transition-all ${
            isBookmarked
              ? "bg-purple-100 border-purple-400 text-purple-700"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-purple-600" : ""}`}
          />
        </button>
      </div>

      {/* Word being learned */}
      <div className="mb-6">
        <p className="text-gray-600 mb-2">الكلمة:</p>
        <div className="flex items-center gap-3">
          <div className="inline-block bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg">
            {question.word}
          </div>
          <button
            onClick={() => onPronounce(question.word)}
            className="h-8 px-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 border border-purple-300 hover:bg-purple-50 bg-white transition-all"
          >
            <Volume2 className="w-4 h-4" />
          </button>
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
                    <span className="text-green-600">صحيح!</span>
                  </div>
                )}
                {showIncorrect && (
                  <div className="flex items-center gap-2">
                    <X className="w-6 h-6 text-red-600" />
                    <span className="text-red-600">خطأ</span>
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
            <span className="ml-2">💡</span>
            <strong>شرح:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
