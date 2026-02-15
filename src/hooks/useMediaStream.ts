import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

export default function useMediaStream() {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isVideoEnabled, setIsVideoEnabled] = useState(true)
    const [isAudioEnabled, setIsAudioEnabled] = useState(true)

    const initStream = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            setStream(mediaStream)
        } catch (err: any) {
            console.error('Error accessing media devices:', err)
            setError(err)
            toast.error('Camera/Microphone access denied')
        }
    }, [])

    const toggleVideo = useCallback(() => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled
                setIsVideoEnabled(track.enabled)
            })
        }
    }, [stream])

    const toggleAudio = useCallback(() => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled
                setIsAudioEnabled(track.enabled)
            })
        }
    }, [stream])

    return {
        stream,
        error,
        initStream,
        isVideoEnabled,
        isAudioEnabled,
        toggleVideo,
        toggleAudio
    }
}
