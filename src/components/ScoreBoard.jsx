import { Award, Target } from "lucide-react";

export function ScoreBoard({ currentQuestion, totalQuestions, score }) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="p-6 mb-8 bg-white dark:bg-gray-800 shadow-lg border-none rounded-xl flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Current Question */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 font-[ABeeZee] text-[16px] font-normal not-italic">
              السؤال
            </p>
            <p className="text-gray-900 dark:text-white">
              {currentQuestion} / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <Award className="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">النتيجة</p>
            <p className="text-gray-900 dark:text-white">
              {score} / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <Award className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">الدقة</p>
            <p className="text-gray-900 dark:text-white">
              {currentQuestion > 0
                ? Math.round((score / currentQuestion) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[rgba(232,226,226,0)] rounded-[10px]">
        <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
          <span>التقدم</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="bg-purple-200 dark:bg-purple-900 relative h-3 w-full overflow-hidden rounded-full"
        >
          <div
            className="bg-purple-600 dark:bg-purple-400 h-full w-full flex-1 transition-all duration-300 ease-in-out"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </div>
      </div>
    </div>
  );
}
