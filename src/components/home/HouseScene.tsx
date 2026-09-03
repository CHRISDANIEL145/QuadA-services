'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ServiceCategory as Category } from '@/types'

interface HouseSceneProps {
  categories?: Category[]
}

export function HouseScene({ }: HouseSceneProps) {
  const container = useRef<HTMLDivElement>(null)
  
  const [particles, setParticles] = useState<{width: string, height: string, top: string, left: string, animation: string, animationDelay: string}[]>([])

  useEffect(() => {
    setTimeout(() => {
      setParticles([...Array(25)].map(() => ({
        width: Math.random() * 5 + 1 + 'px',
        height: Math.random() * 5 + 1 + 'px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        animation: `float-particle ${Math.random() * 15 + 10}s linear infinite`,
        animationDelay: `-${Math.random() * 10}s`
      })))
    }, 0)
  }, [])
  
  // 300vh scroll container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  // Video 3D Transforms (0 to 0.5)
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.25])
  const videoRotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0])
  const videoY = useTransform(scrollYProgress, [0, 0.5], [20, 0])
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.3], ["0px", "0px"])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0.9, 1])
  const videoFilter = useTransform(scrollYProgress, [0, 0.3, 0.8], ['brightness(0.8)', 'brightness(1)', 'brightness(0.4)'])

  // Title 3D "Fly Through" (0 to 0.4)
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.5])
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
  const titleFilter = useTransform(scrollYProgress, [0.05, 0.15], ["blur(0px)", "blur(10px)"])

  // Scroll Indicator Fade (0 to 0.15)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
  


  return (
    <div ref={container} className="relative h-[300vh] w-full bg-navy-950">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* The 3D Video Element */}
        <motion.div 
          style={{ 
            scale: videoScale, 
            rotateX: videoRotateX, 
            y: videoY,
            borderRadius: videoBorderRadius,
            opacity: videoOpacity,
            filter: videoFilter
          }}
          className="absolute inset-0 mx-auto w-full h-full overflow-hidden origin-bottom"
        >
          <video 
            src="/hero-section.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/luxury-hero.jpg"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/20 to-navy-950/80" />
        </motion.div>

        {/* Cinematic Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen">
          {particles.map((style, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-cream-100 blur-[1px]"
              style={style}
            />
          ))}
        </div>

        {/* 3D Fly-Through Typography */}
        <motion.div 
          style={{ 
            scale: titleScale, 
            opacity: titleOpacity, 
            filter: titleFilter 
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 w-full"
        >
          <div className="overflow-hidden mb-2 md:mb-4 flex justify-center w-full">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-display font-normal text-white tracking-widest drop-shadow-2xl leading-none w-full text-center"
            >
              Elevating Your
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12 flex justify-center w-full">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-display font-normal text-cream-200 tracking-widest drop-shadow-2xl leading-none w-full text-center"
            >
              Everyday Existence
            </motion.h1>
          </div>
        </motion.div>
        


        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
        >
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-sans">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-cream-100"
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}
