const FREQUENCY = 300;
const DURATION = 200;
const PAUSE = 100;
const BREAK = 300;
const LONG_BREAK = 1200;
const VOLUME = 0.4;

async function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function beep(duration, frequency, volume) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
  return new Promise((resolve) => {
    oscillator.onended = () => {
      resolve();
    };
  });
}

export async function alert() {
  await beep(DURATION, FREQUENCY, VOLUME);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, VOLUME);
  await wait(PAUSE);
}
