/**
 * Audio utilities for the Microsoft Word feature celebration gong
 */

interface AudioConfig {
  volume: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private gongAudio: HTMLAudioElement | null = null;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      // Initialize Web Audio API context for better control
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Try to load a real gong sound, fallback to synthetic
      this.gongAudio = new Audio('/gong-sound.mp3');
      this.gongAudio.volume = 0.9; // Increased volume for better impact
      this.gongAudio.preload = 'auto';

      // If real gong file doesn't exist, we'll use synthetic sound
      this.gongAudio.addEventListener('error', () => {
        console.log('Real gong sound not found, will use synthetic sound');
        this.gongAudio = null;
      });
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  /**
   * Play the celebration gong sound with more realistic synthesis
   */
  async playGongSound(config: AudioConfig = { volume: 0.85 }): Promise<void> {
    try {
      // Resume audio context if suspended (required by some browsers)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Try to play the real gong audio file first
      if (this.gongAudio) {
        this.gongAudio.volume = Math.min(Math.max(config.volume, 0), 1);
        this.gongAudio.currentTime = 0; // Reset to beginning

        try {
          await this.gongAudio.play();
          return; // If successful, don't create synthetic sound
        } catch (error) {
          console.log('Real gong audio failed, falling back to synthetic sound');
        }
      }

      // Create a more realistic synthetic gong sound
      this.createRealisticGongSound(config.volume);
    } catch (error) {
      console.warn('Failed to play gong sound:', error);
    }
  }

  /**
   * Create a highly realistic traditional gong sound
   */
  private createRealisticGongSound(volume: number = 0.9): void {
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const duration = 5.0; // Extended to 5 seconds for full gong resonance

      // Traditional gong harmonic series - based on actual gong measurements
      const fundamentalFreq = 110; // A2 note
      const frequencies = [
        // Fundamental and octaves - povećane jačine za dublji zvuk
        { freq: fundamentalFreq, vol: 0.7, decay: 4.8, detune: 0, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 2, vol: 0.45, decay: 4.2, detune: -5, type: 'sine' as OscillatorType },

        // Perfect fifths and fourths
        { freq: fundamentalFreq * 1.5, vol: 0.5, decay: 4.0, detune: 3, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 3, vol: 0.35, decay: 3.5, detune: -2, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 4.5, vol: 0.3, decay: 3.0, detune: 4, type: 'sine' as OscillatorType },

        // Minor thirds and sevenths for metallic character
        { freq: fundamentalFreq * 1.2, vol: 0.4, decay: 3.8, detune: -8, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 2.4, vol: 0.32, decay: 3.2, detune: 6, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 1.8, vol: 0.28, decay: 3.5, detune: -3, type: 'sine' as OscillatorType },

        // High harmonics for shimmer - pojačane za bolji metalni zvuk
        { freq: fundamentalFreq * 6, vol: 0.25, decay: 2.5, detune: 8, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 8, vol: 0.2, decay: 2.0, detune: -6, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 10, vol: 0.15, decay: 1.5, detune: 10, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 12, vol: 0.12, decay: 1.2, detune: -4, type: 'sine' as OscillatorType },

        // Very high frequencies for metallic ring
        { freq: fundamentalFreq * 15, vol: 0.08, decay: 1.0, detune: 12, type: 'sine' as OscillatorType },
        { freq: fundamentalFreq * 18, vol: 0.06, decay: 0.8, detune: -8, type: 'sine' as OscillatorType },
      ];

      frequencies.forEach(({ freq, vol, decay, detune, type }, index) => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        const delay = this.audioContext!.createDelay();
        const convolver = this.audioContext!.createConvolver();

        // Create simple reverb impulse
        const impulseLength = this.audioContext!.sampleRate * 0.5;
        const impulse = this.audioContext!.createBuffer(2, impulseLength, this.audioContext!.sampleRate);
        for (let channel = 0; channel < 2; channel++) {
          const channelData = impulse.getChannelData(channel);
          for (let i = 0; i < impulseLength; i++) {
            const n = impulseLength - i;
            channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / impulseLength, 2) * 0.1;
          }
        }
        convolver.buffer = impulse;

        // Connect the nodes
        oscillator.connect(filter);
        filter.connect(delay);
        delay.connect(gainNode);
        gainNode.connect(convolver);
        convolver.connect(this.audioContext!.destination);

        // Also direct connection for immediate sound
        gainNode.connect(this.audioContext!.destination);

        // Configure oscillator with detuning
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, now);
        oscillator.detune.setValueAtTime(detune, now);

        // Slight frequency bend for realism
        oscillator.frequency.exponentialRampToValueAtTime(freq * 0.998, now + decay);

        // Add delay for spatial effect
        delay.delayTime.setValueAtTime(0.005 + index * 0.003, now);

        // Configure filter for bronze/brass character
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 4, now);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + decay);
        filter.Q.setValueAtTime(1.5, now);

        // Realistic envelope - sharp attack, complex decay
        const adjustedVolume = vol * volume * (0.85 + Math.random() * 0.3);
        const attackTime = 0.005 + Math.random() * 0.01;

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(adjustedVolume, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(adjustedVolume * 0.8, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(adjustedVolume * 0.4, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(adjustedVolume * 0.2, now + 1.0);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + decay);

        oscillator.start(now);
        oscillator.stop(now + decay);
      });

      // Initial strike/impact sound
      this.createGongStrikeSound(now, volume);

      // Sub-bass resonance for physical presence
      this.createSubBassResonance(now, volume);
    } catch (error) {
      console.warn('Failed to create realistic gong sound:', error);
    }
  }

  /**
   * Create the initial strike sound
   */
  private createGongStrikeSound(startTime: number, volume: number): void {
    if (!this.audioContext) return;

    const strikeDuration = 0.15;
    const bufferSize = this.audioContext.sampleRate * strikeDuration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate strike noise
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.exp(-i / (this.audioContext.sampleRate * 0.05));
      data[i] = (Math.random() * 2 - 1) * 0.3 * envelope;
    }

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter1 = this.audioContext.createBiquadFilter();
    const filter2 = this.audioContext.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gain);
    gain.connect(this.audioContext.destination);

    // Metallic strike filtering
    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(800, startTime);
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(6000, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume * 0.4, startTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + strikeDuration);

    source.start(startTime);
    source.stop(startTime + strikeDuration);
  }

  /**
   * Create sub-bass resonance
   */
  private createSubBassResonance(startTime: number, volume: number): void {
    if (!this.audioContext) return;

    const bassOsc = this.audioContext.createOscillator();
    const bassGain = this.audioContext.createGain();
    const bassFilter = this.audioContext.createBiquadFilter();

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.audioContext.destination);

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(55, startTime); // A1
    bassOsc.frequency.exponentialRampToValueAtTime(50, startTime + 2.0);

    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(150, startTime);

    bassGain.gain.setValueAtTime(0, startTime);
    bassGain.gain.linearRampToValueAtTime(volume * 0.4, startTime + 0.02);
    bassGain.gain.exponentialRampToValueAtTime(volume * 0.2, startTime + 0.5);
    bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + 2.5);

    bassOsc.start(startTime);
    bassOsc.stop(startTime + 2.5);
  }

  /**
   * Create a visual celebration effect sound
   */
  createCelebrationTone(frequency: number = 432, duration: number = 0.3): void {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Create a bell-like sound
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.3, this.audioContext.currentTime + duration);

      // Envelope for natural sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Failed to create celebration tone:', error);
    }
  }

  /**
   * Stop all audio playback
   */
  stopAll(): void {
    if (this.gongAudio) {
      this.gongAudio.pause();
      this.gongAudio.currentTime = 0;
    }
  }

  /**
   * Set global volume
   */
  setVolume(volume: number): void {
    if (this.gongAudio) {
      this.gongAudio.volume = Math.min(Math.max(volume, 0), 1);
    }
  }
}

// Create singleton instance
const audioManager = new AudioManager();

export const audioUtils = {
  /**
   * Play the main gong celebration sound
   */
  playGong: (volume: number = 0.6) => audioManager.playGongSound({ volume }),

  /**
   * Create a harmonic celebration tone
   */
  playHarmonic: (frequency: number = 432) => audioManager.createCelebrationTone(frequency),

  /**
   * Play a sequence of celebration tones for special achievements
   */
  playAchievementFanfare: () => {
    const frequencies = [392, 440, 523, 659]; // G4, A4, C5, E5
    frequencies.forEach((freq, index) => {
      setTimeout(() => audioManager.createCelebrationTone(freq, 0.4), index * 150);
    });
  },

  /**
   * Stop all audio
   */
  stopAll: () => audioManager.stopAll(),

  /**
   * Set global volume
   */
  setVolume: (volume: number) => audioManager.setVolume(volume),

  /**
   * Check if audio is supported
   */
  isSupported: () => {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  },
};
