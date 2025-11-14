import { BookOpen, Moon, Sun, BarChart3 } from "lucide-react";

export function Header({ isDark, onToggleTheme, onShowHistory }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onShowHistory}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="سجل الإنجازات"
        >
          <BarChart3 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          <h1 className="text-purple-800 dark:text-purple-300">
            قاموس متقن الكلمات
          </h1>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="تبديل الوضع"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-center">
        تعلم المرادفات والأضداد واستخدام الكلمات!
      </p>
    </div>
  );
}
