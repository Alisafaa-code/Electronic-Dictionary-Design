export function pronounceWord(word) {
  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);

    // Function to set the voice
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find an Arabic voice
      const arabicVoice = voices.find((voice) => voice.lang.startsWith("ar"));

      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.lang = "ar-SA"; // Arabic language
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    };

    // Voices may need to be loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      setVoice();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = () => {
        setVoice();
      };
    }
  } else {
    alert("عذراً، متصفحك لا يدعم النطق الصوتي.");
  }
}
