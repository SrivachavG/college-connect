export type AmbienceType = 'synth' | 'audio'

export interface AmbiencePreset {
    id: string
    name: string
    type: AmbienceType
    category: 'Noise' | 'Nature' | 'Atmosphere' | 'Music'
    // Synth params
    noiseColor?: 'white' | 'pink' | 'brown'
    filterType?: BiquadFilterType
    filterFreq?: number
    filterQ?: number
    // Audio params
    src?: string
}

export const ambiencePresets: AmbiencePreset[] = [
    // --- NOISE COLORS ---
    { id: 'white', name: 'White Noise', type: 'synth', category: 'Noise', noiseColor: 'white' },
    { id: 'pink', name: 'Pink Noise', type: 'synth', category: 'Noise', noiseColor: 'pink' },
    { id: 'brown', name: 'Brown Noise', type: 'synth', category: 'Noise', noiseColor: 'brown' },
    { id: 'violet', name: 'Violet Noise', type: 'synth', category: 'Noise', noiseColor: 'white', filterType: 'highpass', filterFreq: 2000 },

    // --- NATURE (Generative) ---
    { id: 'soft-rain', name: 'Soft Rain', type: 'synth', category: 'Nature', noiseColor: 'pink', filterType: 'lowpass', filterFreq: 400 },
    { id: 'heavy-rain', name: 'Heavy Rain', type: 'synth', category: 'Nature', noiseColor: 'pink', filterType: 'lowpass', filterFreq: 1200 },
    { id: 'waterfall', name: 'Waterfall', type: 'synth', category: 'Nature', noiseColor: 'white', filterType: 'lowpass', filterFreq: 500 },
    { id: 'forest', name: 'Forest Stream', type: 'synth', category: 'Nature', noiseColor: 'pink', filterType: 'highpass', filterFreq: 600 },
    { id: 'wind', name: 'Windy Day', type: 'synth', category: 'Nature', noiseColor: 'pink', filterType: 'bandpass', filterFreq: 400, filterQ: 1 },

    // --- ATMOSPHERE (Generative) ---
    { id: 'space', name: 'Deep Space', type: 'synth', category: 'Atmosphere', noiseColor: 'brown', filterType: 'lowpass', filterFreq: 60 },
    { id: 'fan', name: 'Electric Fan', type: 'synth', category: 'Atmosphere', noiseColor: 'white', filterType: 'bandpass', filterFreq: 150, filterQ: 5 },
    { id: 'airplane', name: 'Airplane Cabin', type: 'synth', category: 'Atmosphere', noiseColor: 'brown', filterType: 'bandpass', filterFreq: 100, filterQ: 2 },



    // --- COMPLEX ATMOSPHERE (Audio) ---
    { id: 'coffee', name: 'Coffee Shop', type: 'audio', category: 'Atmosphere', src: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_8902f5a09c.mp3?filename=people-talking-in-a-small-room-6058.mp3' }, // Placeholder for chatter
    { id: 'crickets', name: 'Night Crickets', type: 'audio', category: 'Nature', src: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_0dc55f3070.mp3?filename=crickets-chirping-at-night-8468.mp3' },
    { id: 'waves', name: 'Ocean Waves', type: 'audio', category: 'Nature', src: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b236166a.mp3?filename=sea-waves-loop-7278.mp3' },
    { id: 'thunder', name: 'Thunderstorm', type: 'audio', category: 'Nature', src: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c36c9d698e.mp3?filename=light-rain-and-thunder-14695.mp3' },
]
