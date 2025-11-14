import { Card } from './ui/card';
import { Button } from './ui/button';
import { Bookmark, Volume2, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface BookmarkedWord {
  word: string;
  type: 'synonym' | 'antonym' | 'usage';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface BookmarkedWordsProps {
  bookmarkedWords: BookmarkedWord[];
  onRemoveBookmark: (word: string) => void;
  onPronounce: (word: string) => void;
}

const getTypeInfo = (type: string) => {
  switch (type) {
    case 'synonym':
      return { label: 'Synonym', color: 'bg-blue-500' };
    case 'antonym':
      return { label: 'Antonym', color: 'bg-orange-500' };
    case 'usage':
      return { label: 'Usage', color: 'bg-green-500' };
    default:
      return { label: 'Question', color: 'bg-gray-500' };
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'hard':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export function BookmarkedWords({ bookmarkedWords, onRemoveBookmark, onPronounce }: BookmarkedWordsProps) {
  if (bookmarkedWords.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mb-6 bg-white shadow-lg border-none">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-purple-600 fill-purple-600" />
        <h3 className="text-gray-800">My Bookmarked Words ({bookmarkedWords.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {bookmarkedWords.map((item) => {
          const typeInfo = getTypeInfo(item.type);
          return (
            <div
              key={item.word}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{item.word}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`${typeInfo.color} text-white text-xs`}>
                      {typeInfo.label}
                    </Badge>
                    <Badge className={`${getDifficultyColor(item.difficulty)} text-white text-xs`}>
                      {item.difficulty}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveBookmark(item.word)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove bookmark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onPronounce(item.word)}
                className="w-full mt-2 border-purple-300 hover:bg-purple-100"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Pronounce
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
