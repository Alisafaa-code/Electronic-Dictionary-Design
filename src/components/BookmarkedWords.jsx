import { Bookmark, Volume2, X } from "lucide-react";

const getTypeInfo = (type) => {
  switch (type) {
    case "synonym":
      return { label: "Synonym", color: "bg-blue-500" };
    case "antonym":
      return { label: "Antonym", color: "bg-orange-500" };
    case "usage":
      return { label: "Usage", color: "bg-green-500" };
    default:
      return { label: "Question", color: "bg-gray-500" };
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "hard":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function BookmarkedWords({
  bookmarkedWords,
  onRemoveBookmark,
  onPronounce,
}) {
  if (bookmarkedWords.length === 0) {
    return null;
  }

  return (
    <div className="p-6 mb-6 bg-white shadow-lg border-none rounded-xl flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-purple-600 fill-purple-600" />
        <h3 className="text-gray-800">
          My Bookmarked Words ({bookmarkedWords.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {bookmarkedWords.map((item) => {
          const typeInfo = getTypeInfo(item.type);
          return (
            <div
              key={item.word}
              className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{item.word}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`${typeInfo.color} text-white text-xs inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap`}
                    >
                      {typeInfo.label}
                    </span>
                    <span
                      className={`${getDifficultyColor(
                        item.difficulty
                      )} text-white text-xs inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 font-medium w-fit whitespace-nowrap`}
                    >
                      {item.difficulty}
                    </span>
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
              <button
                onClick={() => onPronounce(item.word)}
                className="w-full mt-2 h-8 px-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 border border-purple-300 hover:bg-purple-100 bg-white transition-all"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Pronounce
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
