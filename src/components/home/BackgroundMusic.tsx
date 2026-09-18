'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * BackgroundMusic — soft ambient background music for the home page.
 * Starts muted to comply with browser autoplay policies.
 * A small floating button lets the user unmute/mute.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  // Show the button after a short delay so it doesn't immediately distract
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  // Start playback (muted) on mount — browser allows muted autoplay
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.18
    audio.muted = true
    audio.play().then(() => setReady(true)).catch(() => {
      // Autoplay blocked — wait for first user interaction
      const unlock = () => {
        audio.play().then(() => setReady(true)).catch(() => {})
        window.removeEventListener('click', unlock)
        window.removeEventListener('scroll', unlock)
      }
      window.addEventListener('click', unlock, { once: true })
      window.addEventListener('scroll', unlock, { once: true })
    })
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (muted) {
      audio.muted = false
      setMuted(false)
    } else {
      audio.muted = true
      setMuted(true)
    }
  }

  return (
    <>
      {/* Royalty-free soft ambient piano — Pixabay CC0 */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2024/02/28/audio_54ef84c32f.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />

      {/* Floating mute/unmute button */}
      {visible && (
        <button
          onClick={toggle}
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          title={muted ? 'Play ambient music' : 'Mute ambient music'}
          className={`
            fixed bottom-6 right-6 z-50
            w-10 h-10 rounded-full
            flex items-center justify-center
            transition-all duration-500
            shadow-lg shadow-navy-900/20
            border border-white/20
            backdrop-blur-md
            ${muted
              ? 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80'
              : 'bg-navy-900/80 text-cream-200 hover:bg-navy-800/90'
            }
          `}
          style={{ opacity: visible ? 1 : 0 }}
        >
          {muted
            ? <VolumeX size={16} />
            : <Volume2 size={16} />
          }
        </button>
      )}
    </>
  )
}
