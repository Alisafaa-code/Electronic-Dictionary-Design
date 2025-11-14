import { Award, Target } from "lucide-react";

export function ScoreBoard({ currentQuestion, totalQuestions, score }) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="p-6 mb-8 bg-white shadow-lg border-none rounded-xl flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Current Question */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-[rgb(160,160,191)] font-[ABeeZee] text-[16px] font-normal not-italic">
              السؤال
            </p>
            <p className="text-gray-900">
              {currentQuestion} / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-lg">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-[rgb(194,202,214)]">النتيجة</p>
            <p className="text-gray-900">
              {score} / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">الدقة</p>
            <p className="text-gray-900">
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
        <div className="flex justify-between text-gray-600 mb-2">
          <span>التقدم</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="bg-purple-200 relative h-3 w-full overflow-hidden rounded-full"
        >
          <div
            className="bg-purple-600 h-full w-full flex-1 transition-all duration-300 ease-in-out"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </div>
      </div>
    </div>
  );
}
