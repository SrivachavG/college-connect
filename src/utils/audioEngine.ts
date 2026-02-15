import { AmbiencePreset } from '../data/ambiencePresets'

export class AudioEngine {
    private audioCtx: AudioContext | null = null
    private gainNode: GainNode | null = null
    private sourceNode: AudioBufferSourceNode | null = null
    private filterNode: BiquadFilterNode | null = null
    private audioElement: HTMLAudioElement | null = null

    constructor() {
        // Lazy init in start()
    }

    private initCtx() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
            this.gainNode = this.audioCtx.createGain()
            this.gainNode.connect(this.audioCtx.destination)
        }
    }

    private createNoiseBuffer(type: 'white' | 'pink' | 'brown') {
        if (!this.audioCtx) return null
        const bufferSize = this.audioCtx.sampleRate * 2 // 2s loop
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate)
        const data = buffer.getChannelData(0)

        if (type === 'white') {
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1
            }
        } else if (type === 'pink') {
            const b = [0, 0, 0, 0, 0, 0, 0]
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1
                b[0] = 0.99886 * b[0] + white * 0.0555179
                b[1] = 0.99332 * b[1] + white * 0.0750759
                b[2] = 0.96900 * b[2] + white * 0.1538520
                b[3] = 0.86650 * b[3] + white * 0.3104856
                b[4] = 0.55000 * b[4] + white * 0.5329522
                b[5] = -0.7616 * b[5] - white * 0.0168980
                data[i] = b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362
                data[i] *= 0.11
                b[6] = white * 0.115926
            }
        } else if (type === 'brown') {
            let lastOut = 0
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1
                data[i] = (lastOut + (0.02 * white)) / 1.02
                lastOut = data[i]
                data[i] *= 3.5
            }
        }
        return buffer
    }

    play(preset: AmbiencePreset) {
        this.stop() // Stop current
        this.initCtx()

        if (this.audioCtx?.state === 'suspended') {
            this.audioCtx.resume()
        }

        if (preset.type === 'synth' && preset.noiseColor) {
            // SYNTH MODE
            const buffer = this.createNoiseBuffer(preset.noiseColor)
            if (!buffer || !this.audioCtx || !this.gainNode) return

            this.sourceNode = this.audioCtx.createBufferSource()
            this.sourceNode.buffer = buffer
            this.sourceNode.loop = true

            // Filter Chain
            if (preset.filterType && preset.filterFreq) {
                this.filterNode = this.audioCtx.createBiquadFilter()
                this.filterNode.type = preset.filterType
                this.filterNode.frequency.value = preset.filterFreq
                if (preset.filterQ) this.filterNode.Q.value = preset.filterQ

                this.sourceNode.connect(this.filterNode)
                this.filterNode.connect(this.gainNode)
            } else {
                this.sourceNode.connect(this.gainNode)
            }

            this.sourceNode.start()

        } else if (preset.type === 'audio' && preset.src) {
            // AUDIO MODE
            this.audioElement = new Audio(preset.src)
            this.audioElement.loop = true
            this.audioElement.crossOrigin = 'anonymous'

            // Connect to Web Audio API for volume control
            const track = this.audioCtx!.createMediaElementSource(this.audioElement)
            track.connect(this.gainNode!)

            this.audioElement.play().catch(e => console.error("Playback failed", e))
        }
    }

    stop() {
        if (this.sourceNode) {
            this.sourceNode.stop()
            this.sourceNode.disconnect()
            this.sourceNode = null
        }
        if (this.filterNode) {
            this.filterNode.disconnect()
            this.filterNode = null
        }
        if (this.audioElement) {
            this.audioElement.pause()
            this.audioElement.src = ''
            this.audioElement = null
        }
    }

    setVolume(value: number) {
        if (this.gainNode) {
            // Quadratic fade for better perception
            this.gainNode.gain.value = value * value
        }
    }
}
