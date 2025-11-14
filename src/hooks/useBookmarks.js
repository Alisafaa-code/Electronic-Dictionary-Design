import { useState, useEffect } from "react";

export function useBookmarks() {
  const [bookmarkedWords, setBookmarkedWords] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wordmaster-bookmarks");
    if (saved) {
      try {
        setBookmarkedWords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load bookmarks", e);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "wordmaster-bookmarks",
      JSON.stringify(bookmarkedWords)
    );
  }, [bookmarkedWords]);

  const toggleBookmark = (word, questionData) => {
    const isCurrentlyBookmarked = bookmarkedWords.some(
      (bw) => bw.word === word
    );

    if (isCurrentlyBookmarked) {
      setBookmarkedWords(bookmarkedWords.filter((bw) => bw.word !== word));
    } else {
      setBookmarkedWords([
        ...bookmarkedWords,
        {
          word: questionData.word,
          type: questionData.type,
          difficulty: questionData.difficulty,
        },
      ]);
    }
  };

  const removeBookmark = (word) => {
    setBookmarkedWords(bookmarkedWords.filter((bw) => bw.word !== word));
  };

  const isBookmarked = (word) => {
    return bookmarkedWords.some((bw) => bw.word === word);
  };

  return {
    bookmarkedWords,
    toggleBookmark,
    removeBookmark,
    isBookmarked,
  };
}
