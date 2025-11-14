import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Award, Target } from 'lucide-react';

interface ScoreBoardProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export function ScoreBoard({ currentQuestion, totalQuestions, score }: ScoreBoardProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Card className="p-6 mb-8 bg-white shadow-lg border-none">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Current Question */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-[rgb(160,160,191)] font-[ABeeZee] text-[16px] font-normal not-italic">Question</p>
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
            <p className="text-[rgb(194,202,214)]">Score</p>
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
            <p className="text-gray-600">Accuracy</p>
            <p className="text-gray-900">
              {currentQuestion > 0 ? Math.round((score / currentQuestion) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[rgba(232,226,226,0)] rounded-[10px]">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
    </Card>
  );
}
