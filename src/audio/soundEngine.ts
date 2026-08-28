// Comprehensive Museum Audio Engine & Soundtrack Manager
// Handles soundtrack crossfading and high-end acoustic museum sound effects

type SoundtrackKey =
  | 'exterior'
  | 'lobby'
  | 'elevator'
  | 'floor-1'
  | 'floor-2'
  | 'floor-3'
  | 'floor-4'
  | 'floor-5'
  | 'rooftop';

const SOUNDTRACK_MAP: Record<SoundtrackKey, string> = {
  exterior: '/soundtracks/Woody Path.mp3',
  lobby: '/soundtracks/lobby.mp3',
  elevator: '/soundtracks/Minecraft Music Disc - Chirp (HD).mp3',
  'floor-1': '/soundtracks/Ballerina.mp3',
  'floor-2': '/soundtracks/universe sandbox.mp3',
  'floor-3': '/soundtracks/C418  - Dog - Minecraft Volume Alpha.mp3',
  'floor-4': '/soundtracks/Distant Echoes x Memory Reboot x Fainted.mp3',
  'floor-5': '/soundtracks/Minecraft Music Disc - Stal (HD).mp3',
  rooftop: '/soundtracks/HAPPY BIRTHDAY INSTRUMENTAL.mp3',
};

class MuseumSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;
  private currentTrackKey: SoundtrackKey | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public enableAudio(): void {
    this.initContext();
    this.isMuted = false;
    if (this.currentTrackKey) {
      this.playTrack(this.currentTrackKey);
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      if (this.currentAudio) {
        this.currentAudio.pause();
      }
    } else {
      if (this.currentAudio) {
        this.currentAudio.play().catch(() => {});
      } else if (this.currentTrackKey) {
        this.playTrack(this.currentTrackKey);
      }
    }
    return !this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // ── SOUNDTRACK LOOP & CROSSFADE ──
  public playTrack(key: SoundtrackKey): void {
    this.currentTrackKey = key;
    const src = SOUNDTRACK_MAP[key];
    if (!src) return;

    // If already playing this track and audio is running, do nothing
    if (this.currentAudio && this.currentAudio.src.endsWith(encodeURI(src.replace(/^\//, '')))) {
      if (!this.isMuted && this.currentAudio.paused) {
        this.currentAudio.play().catch(() => {});
      }
      return;
    }

    const previousAudio = this.currentAudio;

    // Create new audio element
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = this.isMuted ? 0 : 0.45;
    this.currentAudio = newAudio;

    if (!this.isMuted) {
      newAudio.play().catch(() => {
        // Autoplay restrictions handle
      });
    }

    // Fade out previous audio
    if (previousAudio) {
      let currentVol = previousAudio.volume;
      const fadeStep = 0.05;
      const fadeTimer = setInterval(() => {
        currentVol -= fadeStep;
        if (currentVol <= 0.02) {
          clearInterval(fadeTimer);
          previousAudio.pause();
          previousAudio.src = '';
        } else {
          previousAudio.volume = Math.max(0, currentVol);
        }
      }, 50);
    }
  }

  // ── ELEGANT MUSEUM ACOUSTIC SOUND EFFECTS ──

  // Soft warm wooden/crystal inspection tap
  public playInspect(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // Warm acoustic transition swell
  public playTransition(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.35);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {}
  }

  // Deep architectural sliding door sound
  public playDoorOpen(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.5);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(70, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    } catch {}
  }

  // Smooth mechanical elevator glide
  public playElevatorRide(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

      osc1.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc1.stop(this.ctx.currentTime + 1.4);
    } catch {}
  }

  // Classic dual-tone brass elevator chime (E6 + G#6)
  public playElevatorBell(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [1318.51, 1661.22]; // E6, G#6 harmonic bell chime
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.09));

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + (idx * 0.09));
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + (idx * 0.09) + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx * 0.09) + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + (idx * 0.09));
        osc.stop(this.ctx.currentTime + (idx * 0.09) + 0.9);
      });
    } catch {}
  }

  // Crystal sparkle harp secret unlock
  public playSecretUnlock(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.07));

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + (idx * 0.07));
        gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + (idx * 0.07) + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx * 0.07) + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + (idx * 0.07));
        osc.stop(this.ctx.currentTime + (idx * 0.07) + 0.4);
      });
    } catch {}
  }

  // Joyful celebratory "Yayy!" cheer & firework crackle
  public playCelebrationYayy(): void {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // 1. Cheerful ascending fanfare chime ("YAYY!")
      const yayChords = [
        [523.25, 659.25], // C, E
        [659.25, 783.99], // E, G
        [783.99, 1046.50], // G, C
        [1046.50, 1318.51, 1567.98], // High C, E, G triumphant chord!
      ];

      yayChords.forEach((chord, step) => {
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + step * 0.08);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime + step * 0.08);
          gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + step * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + step * 0.08 + (step === 3 ? 0.8 : 0.25)
          );

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime + step * 0.08);
          osc.stop(this.ctx.currentTime + step * 0.08 + (step === 3 ? 0.8 : 0.25));
        });
      });

      // 2. Firework whoosh & sparkler burst simulation
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.8, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime + 0.25);
      filter.frequency.exponentialRampToValueAtTime(2500, this.ctx.currentTime + 0.7);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime + 0.25);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.25);
      noiseGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.35);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(this.ctx.currentTime + 0.25);
      whiteNoise.stop(this.ctx.currentTime + 0.8);
    } catch {}
  }
}

export const soundEngine = new MuseumSoundEngine();
