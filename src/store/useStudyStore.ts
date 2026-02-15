import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Goal {
    id: number
    text: string
    completed: boolean
}

export interface Mission {
    id: string
    title: string
    description: string
    color: string
}

interface StudyState {
    // Mission State
    activeMission: Mission | null
    goals: Goal[]

    // Ambience State
    noiseType: string
    volume: number
    selectedPreset: string | null

    // Actions
    startMission: (mission: Mission, initialGoals: string[]) => void
    addGoal: (text: string) => void
    toggleGoal: (id: number) => void
    removeGoal: (id: number) => void
    clearMission: () => void

    setAmbience: (presetId: string | null) => void
    setVolume: (vol: number) => void
}

export const useStudyStore = create<StudyState>()(
    persist(
        (set) => ({
            activeMission: null,
            goals: [],
            noiseType: 'off',
            volume: 0.5,
            selectedPreset: null,

            startMission: (mission, initialGoals) => set({
                activeMission: mission,
                goals: initialGoals.map((text, idx) => ({
                    id: Date.now() + idx,
                    text,
                    completed: false
                }))
            }),

            addGoal: (text) => set((state) => ({
                goals: [...state.goals, { id: Date.now(), text, completed: false }]
            })),

            toggleGoal: (id) => set((state) => ({
                goals: state.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g)
            })),

            removeGoal: (id) => set((state) => ({
                goals: state.goals.filter(g => g.id !== id)
            })),

            clearMission: () => set({ activeMission: null, goals: [] }),

            setAmbience: (presetId) => set({ selectedPreset: presetId }),
            setVolume: (vol) => set({ volume: vol }),
        }),
        {
            name: 'study-room-storage',
        }
    )
)
