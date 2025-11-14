import { RefreshCw } from "lucide-react";

export function NavigationButtons({
  answered,
  isQuizComplete,
  score,
  totalQuestions,
  onNext,
  onRestart,
}) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {answered && !isQuizComplete && (
        <button
          onClick={onNext}
          className="h-10 px-6 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
        >
          Next Question →
        </button>
      )}

      {isQuizComplete && (
        <div className="text-center w-full">
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
            <h2 className="text-green-600 mb-4">🎉 Quiz Complete! 🎉</h2>
            <p className="text-gray-700 mb-2">
              You scored {score} out of {totalQuestions}
            </p>
            <p className="text-gray-600">
              {score === totalQuestions
                ? "Perfect score! You're a Word Master! 🌟"
                : score >= totalQuestions * 0.8
                ? "Great job! Keep up the excellent work! 👏"
                : score >= totalQuestions * 0.6
                ? "Good effort! Practice makes perfect! 💪"
                : "Keep learning! You're doing great! 📚"}
            </p>
          </div>
          <button
            onClick={onRestart}
            className="h-10 px-6 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transition-all"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
