import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Zap, Trophy } from "lucide-react";

export function DifficultySelector({ selectedDifficulty, onSelectDifficulty }) {
  const difficulties = [
    {
      value: "all",
      label: "All Levels",
      icon: Star,
      color: "text-gray-700",
      bgColor: "bg-gray-100 hover:bg-gray-200",
    },
    {
      value: "easy",
      label: "Easy",
      icon: Star,
      color: "text-green-700",
      bgColor: "bg-green-100 hover:bg-green-200",
    },
    {
      value: "medium",
      label: "Medium",
      icon: Zap,
      color: "text-yellow-700",
      bgColor: "bg-yellow-100 hover:bg-yellow-200",
    },
    {
      value: "hard",
      label: "Hard",
      icon: Trophy,
      color: "text-red-700",
      bgColor: "bg-red-100 hover:bg-red-200",
    },
  ];

  return (
    <Card className="p-6 mb-6 bg-white shadow-lg border-none">
      <div className="mb-3">
        <h3 className="text-gray-800">Select Difficulty Level</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {difficulties.map(({ value, label, icon: Icon, color, bgColor }) => (
          <Button
            key={value}
            onClick={() => onSelectDifficulty(value)}
            variant={selectedDifficulty === value ? "default" : "outline"}
            className={`
              ${
                selectedDifficulty === value
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:from-purple-700 hover:to-pink-700"
                  : `${bgColor} border-2 ${color.replace("text-", "border-")}`
              }
              py-6 transition-all
            `}
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
