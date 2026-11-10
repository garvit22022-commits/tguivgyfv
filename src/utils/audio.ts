/**
 * Pure Web Audio API synthesized sacred temple bell / ghanti sound.
 * Zero external audio files; works 100% reliably in all browsers.
 */
class TempleAudioPlayer {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Initialized on user interaction
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playTempleBell();
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playTempleBell(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Fundamental + harmonic partials of a resonant Indian brass temple bell (Ghanti)
      const partials = [
        { freq: 587.33, gain: 0.5, decay: 2.8 },   // D5 (Fundamental)
        { freq: 880.00, gain: 0.35, decay: 2.2 },  // A5
        { freq: 1174.66, gain: 0.25, decay: 1.8 }, // D6
        { freq: 1567.98, gain: 0.15, decay: 1.2 }, // G6
        { freq: 2349.32, gain: 0.08, decay: 0.7 }, // D7 strike transient
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, now);
      masterGain.connect(ctx.destination);

      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);

        // Bell strike envelope: Instant attack, exponential bell ring decay
        pGain.gain.setValueAtTime(0, now);
        pGain.gain.linearRampToValueAtTime(p.gain, now + 0.008);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(pGain);
        pGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + p.decay);
      });
    } catch {
      // Audio context restricted or muted by browser policy
    }
  }

  public playShankhChime(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(330, now + 2.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.8);
    } catch {
      // Audio context restricted
    }
  }
}

export const templeAudio = new TempleAudioPlayer();
