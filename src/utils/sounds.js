// Sound effect functions using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency, duration, type = "sine") {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export function playCorrectSound() {
  // Play ascending notes for success
  playTone(523.25, 0.1); // C5
  setTimeout(() => playTone(659.25, 0.1), 100); // E5
  setTimeout(() => playTone(783.99, 0.2), 200); // G5
}

export function playWrongSound() {
  // Play descending notes for error
  playTone(392, 0.15, "square"); // G4
  setTimeout(() => playTone(293.66, 0.3, "square"), 150); // D4
}

export function playCompletionSound() {
  // Play celebration sound
  [523.25, 587.33, 659.25, 783.99].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.15), i * 100);
  });
}
