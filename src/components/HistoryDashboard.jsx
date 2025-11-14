import { X, TrendingUp, Award, Calendar, Trash2 } from "lucide-react";

export function HistoryDashboard({ history, onClose, onClear }) {
  const totalQuizzes = history.length;
  const averageScore =
    totalQuizzes > 0
      ? Math.round(
          history.reduce(
            (sum, h) => sum + (h.score / h.totalQuestions) * 100,
            0
          ) / totalQuizzes
        )
      : 0;
  const bestScore =
    totalQuizzes > 0
      ? Math.max(...history.map((h) => (h.score / h.totalQuestions) * 100))
      : 0;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            سجل الإنجازات
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Statistics */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">المتوسط</span>
            </div>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {averageScore}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">أفضل نتيجة</span>
            </div>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">
              {Math.round(bestScore)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">عدد المحاولات</span>
            </div>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {totalQuizzes}
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6">
          {totalQuizzes === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>لا يوجد سجل بعد. ابدأ أول اختبار!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((attempt) => {
                const percentage = Math.round(
                  (attempt.score / attempt.totalQuestions) * 100
                );
                return (
                  <div
                    key={attempt.id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(attempt.date)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          percentage >= 90
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : percentage >= 70
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : percentage >= 50
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 dark:text-white font-medium">
                        النتيجة: {attempt.score} / {attempt.totalQuestions}
                      </p>
                      {attempt.difficulty && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {attempt.difficulty === "all"
                            ? "جميع المستويات"
                            : attempt.difficulty === "easy"
                            ? "سهل"
                            : attempt.difficulty === "medium"
                            ? "متوسط"
                            : "صعب"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalQuizzes > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClear}
              className="w-full py-3 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              مسح السجل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
