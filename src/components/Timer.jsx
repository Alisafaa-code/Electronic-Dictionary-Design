import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function Timer({ duration = 30, onTimeout, isPaused }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeout]);

  const percentage = (timeLeft / duration) * 100;
  const isLow = percentage < 30;
  const isCritical = percentage < 10;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock
              className={`w-5 h-5 ${
                isCritical
                  ? "text-red-600 animate-pulse"
                  : isLow
                  ? "text-orange-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              الوقت المتبقي
            </span>
          </div>
          <span
            className={`text-2xl font-bold ${
              isCritical
                ? "text-red-600 animate-pulse"
                : isLow
                ? "text-orange-600"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {timeLeft}
          </span>
        </div>

        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isCritical
                ? "bg-red-600"
                : isLow
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
