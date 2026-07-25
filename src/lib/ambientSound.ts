export interface SoundLoop {
  start: () => void;
  stop: () => void;
}

function createWhiteNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const bufferSize = Math.floor(seconds * ctx.sampleRate);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createBrownNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const bufferSize = Math.floor(seconds * ctx.sampleRate);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

/** Rain + swelling ocean noise, for "Calming Nature Sounds". */
export function createNatureLoop(ctx: AudioContext): SoundLoop {
  const master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(ctx.destination);

  const sources: AudioScheduledSourceNode[] = [];

  // Rain: bright, highpassed white noise.
  const rain = ctx.createBufferSource();
  rain.buffer = createWhiteNoiseBuffer(ctx, 3);
  rain.loop = true;
  const rainFilter = ctx.createBiquadFilter();
  rainFilter.type = "highpass";
  rainFilter.frequency.value = 1500;
  const rainGain = ctx.createGain();
  rainGain.gain.value = 0.12;
  rain.connect(rainFilter).connect(rainGain).connect(master);
  sources.push(rain);

  // Ocean: low, warm brown noise that slowly swells like waves.
  const ocean = ctx.createBufferSource();
  ocean.buffer = createBrownNoiseBuffer(ctx, 4);
  ocean.loop = true;
  const oceanFilter = ctx.createBiquadFilter();
  oceanFilter.type = "lowpass";
  oceanFilter.frequency.value = 500;
  const oceanGain = ctx.createGain();
  oceanGain.gain.value = 0.35;
  ocean.connect(oceanFilter).connect(oceanGain).connect(master);
  sources.push(ocean);

  const swell = ctx.createOscillator();
  swell.frequency.value = 0.07;
  const swellDepth = ctx.createGain();
  swellDepth.gain.value = 0.15;
  swell.connect(swellDepth).connect(oceanGain.gain);
  sources.push(swell);

  return {
    start() {
      const now = ctx.currentTime;
      sources.forEach((s) => s.start(now));
    },
    stop() {
      sources.forEach((s) => {
        try {
          s.stop();
        } catch {
          // already stopped
        }
      });
      master.disconnect();
    },
  };
}

const LOFI_CHORDS: number[][] = [
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [196.0, 261.63, 293.66], // Gsus4
];

/** Slow chord pad + vinyl crackle, for "Lofi Focus Sounds". */
export function createLofiLoop(ctx: AudioContext): SoundLoop {
  const master = ctx.createGain();
  master.gain.value = 0.5;
  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 2200;
  warmth.connect(master);
  master.connect(ctx.destination);

  let chordIndex = 0;
  let chordTimer: ReturnType<typeof setInterval> | null = null;
  let crackleTimer: ReturnType<typeof setTimeout> | null = null;
  let running = false;

  function playChord() {
    const now = ctx.currentTime;
    const notes = LOFI_CHORDS[chordIndex % LOFI_CHORDS.length];
    chordIndex++;
    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.05, now + 1.2);
      noteGain.gain.linearRampToValueAtTime(0, now + 4.5);
      osc.connect(noteGain).connect(warmth);
      osc.start(now);
      osc.stop(now + 4.6);
    });
  }

  function playCrackle() {
    if (!running) return;
    const now = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = createWhiteNoiseBuffer(ctx, 0.05);
    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = "bandpass";
    crackleFilter.frequency.value = 2500 + Math.random() * 2000;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.03 + Math.random() * 0.02;
    src.connect(crackleFilter).connect(crackleGain).connect(master);
    src.start(now);
    crackleTimer = setTimeout(playCrackle, 120 + Math.random() * 300);
  }

  return {
    start() {
      running = true;
      playChord();
      chordTimer = setInterval(playChord, 4000);
      playCrackle();
    },
    stop() {
      running = false;
      if (chordTimer) clearInterval(chordTimer);
      if (crackleTimer) clearTimeout(crackleTimer);
      master.disconnect();
    },
  };
}
