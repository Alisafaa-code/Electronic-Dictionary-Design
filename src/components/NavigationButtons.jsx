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
          className="h-10 px-6 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
        >
          ← السؤال التالي
        </button>
      )}

      {isQuizComplete && (
        <div className="text-center w-full">
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
            <h2 className="text-green-600 mb-4">🎉 اكتمل الاختبار! 🎉</h2>
            <p className="text-gray-700 mb-2">
              حصلت على {score} من {totalQuestions}
            </p>
            <p className="text-gray-600">
              {score === totalQuestions
                ? "درجة كاملة! أنت متقن الكلمات! 🌟"
                : score >= totalQuestions * 0.8
                ? "عمل رائع! استمر في العمل الممتاز! 👏"
                : score >= totalQuestions * 0.6
                ? "جهد جيد! الممارسة تصنع الإتقان! 💪"
                : "استمر في التعلم! أنت تقوم بعمل عظيم! 📚"}
            </p>
          </div>
          <button
            onClick={onRestart}
            className="h-10 px-6 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transition-all"
          >
            <RefreshCw className="w-5 h-5 ml-2" />
            حاول مرة أخرى
          </button>
        </div>
      )}
    </div>
  );
}
