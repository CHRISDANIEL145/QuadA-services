'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const serviceHighlights = [
  { name: 'Home & Maintenance', desc: 'Plumbing, electrical, and structural repairs.' },
  { name: 'Cleaning Services', desc: 'Deep clean, housekeeping, and sanitization.' },
  { name: 'Senior Care', desc: 'Compassionate, trusted assistance.' },
  { name: 'Interior Design', desc: 'Renovation, styling, and spatial planning.' },
  { name: 'Real Estate', desc: 'Buy, sell, and premium rent assistance.' },
  { name: 'Event Services', desc: 'End-to-end luxury coordination.' },
]

const journeySteps = [
  { step: '01', title: 'Discover', desc: 'Browse our comprehensive service catalogue and find exactly what you need.' },
  { step: '02', title: 'Enquire', desc: 'Submit your requirement. No registration, no payment — just your need.' },
  { step: '03', title: 'Connect', desc: 'Our team reviews your enquiry and connects you with the right professional.' },
  { step: '04', title: 'Coordinate', desc: 'We manage scheduling, follow-up, and every step of service delivery.' },
  { step: '05', title: 'Complete', desc: 'Service delivered. We follow up to ensure your absolute satisfaction.' },
]

const trustPoints = [
  'Background-verified professionals',
  'Transparent service process',
  'Direct team communication',
  'Post-service follow-up',
  'Flexible scheduling',
  'No upfront payment required',
]

export default function HomePage() {
  const journeyContainerRef = useRef<HTMLDivElement>(null)
  const journeyLineRef = useRef<HTMLDivElement>(null)
  const journeyStepsRef = useRef<HTMLDivElement[]>([])
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Hero Parallax
    gsap.to('.hero-bg', {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Journey Pinned Interaction
    if (journeyContainerRef.current && journeyLineRef.current && journeyStepsRef.current.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyContainerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        }
      })

      // Draw the vertical line
      tl.fromTo(journeyLineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1 }, 0)

      // Illuminate steps as the line hits them
      journeyStepsRef.current.forEach((step, i) => {
        if (!step) return
        const startTime = (i / (journeyStepsRef.current.length - 1)) * 0.8 // Offset slightly so it completes before end
        
        tl.fromTo(
          step,
          { opacity: 0.2, filter: 'blur(8px)', x: -20 },
          { opacity: 1, filter: 'blur(0px)', x: 0, ease: 'power2.out', duration: 0.2 },
          startTime
        )
      })
    }

    // Force recalculation after layout paints
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)
  }, { scope: undefined }) // Using global scope for ScrollTrigger references

  return (
    <>
      {/* ======================================================
          HERO — Cinematic, Brutalist Typography
          ====================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end pb-32 pt-48 bg-[#0A0F1C] overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-noise z-10" aria-hidden="true" />
        
        {/* Subtle cinematic gradient background */}
        <div className="hero-bg absolute inset-0 opacity-[0.4] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1C2D4F] via-[#0A0F1C] to-[#0A0F1C] z-0" aria-hidden="true" />

        <div className="container-site relative z-20 w-full">
          <div className="max-w-6xl">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] tracking-[-0.04em] mb-16">
              Every service, <br />
              <span className="italic font-light text-[#B8973E]">coordinated</span> <br />
              for you.
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:items-end border-t border-white/20 pt-8 mt-12">
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl font-light">
                From home maintenance to senior care, interior design to real estate — QuadA Services connects you with trusted professionals across Tamil Nadu. Tell us what you need.
              </p>

              <Link
                href="/services"
                className="group flex items-center gap-6 text-white text-sm tracking-[0.2em] uppercase font-semibold"
              >
                Explore Services
                <span className="w-12 h-px bg-[#B8973E] group-hover:w-24 transition-all duration-700 ease-out" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SERVICES OVERVIEW — Editorial Typographic List
          ====================================================== */}
      <section className="py-32 bg-[#FAFAF8] text-[#0A0F1C] relative z-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-24">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#0A0F1C]/50">
                What We Offer
              </p>
            </div>
            <div>
              <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-[-0.02em]">
                Services designed<br />around your life.
              </h2>
            </div>
          </div>

          <div className="border-t border-[#0A0F1C]/10">
            {serviceHighlights.map((service, i) => (
              <Link
                key={service.name}
                href="/services"
                className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-[#0A0F1C]/10 hover:bg-[#0A0F1C]/[0.02] transition-colors"
              >
                <div className="flex items-center gap-8 mb-4 md:mb-0">
                  <span className="text-sm font-mono text-[#0A0F1C]/30">0{i + 1}</span>
                  <h3 className="font-display text-4xl md:text-5xl group-hover:italic transition-all duration-500">
                    {service.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-[#0A0F1C]/50 text-lg font-light hidden sm:block max-w-sm">
                    {service.desc}
                  </p>
                  <ArrowRight
                    size={24}
                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#B8973E]"
                  />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-right">
             <Link href="/services" className="inline-flex items-center gap-4 text-[#0A0F1C] text-sm tracking-[0.1em] uppercase font-semibold hover:text-[#B8973E] transition-colors">
                View All 50+ Services <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          SIGNATURE INTERACTION — Pinned Spatial Journey
          ====================================================== */}
      <section
        ref={journeyContainerRef}
        className="h-screen bg-[#0A0F1C] text-white overflow-hidden flex relative z-20"
      >
        <div className="absolute inset-0 bg-noise z-0" aria-hidden="true" />
        <div className="container-site w-full flex items-center h-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full relative h-[70vh] md:h-[60vh]">

            {/* Left Fixed Title */}
            <div className="flex flex-col justify-center h-full">
              <p className="text-xs text-[#B8973E] tracking-[0.2em] uppercase font-semibold mb-6">
                How It Works
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.02em]">
                Your service journey,<br />
                <span className="italic text-[#B8973E] font-light">step by step.</span>
              </h2>
            </div>

            {/* Right Steps (Scrubbing Area) */}
            <div className="relative h-full flex flex-col justify-between py-4">
              <div
                ref={journeyLineRef}
                className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-[#B8973E] to-[#B8973E]/10 origin-top"
              />

              {journeySteps.map((step, i) => (
                <div
                  key={step.step}
                  ref={(el) => { if (el) journeyStepsRef.current[i] = el }}
                  className="relative flex items-center gap-8 pl-12 opacity-20 blur-sm"
                >
                  <div className="absolute left-[-1px] w-10 h-10 bg-[#0A0F1C] border border-[#B8973E]/50 rounded-full flex items-center justify-center font-mono text-xs text-[#B8973E]">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display mb-1">{step.title}</h3>
                    <p className="text-white/50 text-sm md:text-base font-light max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          TRUST / FEATURES — Stark Typographic Grid
          ====================================================== */}
      <section className="py-32 bg-[#FAFAF8] text-[#0A0F1C] relative z-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#0A0F1C]/50 mb-6">
                Why Choose Us
              </p>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.1] tracking-[-0.02em] mb-12">
                Service you can trust.<br/>People who care.
              </h2>
              <Link
                href="/about"
                className="group flex items-center gap-4 text-[#0A0F1C] text-sm tracking-[0.2em] uppercase font-semibold"
              >
                Our Approach
                <span className="w-12 h-px bg-[#0A0F1C] group-hover:w-24 transition-all duration-700 ease-out" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {trustPoints.map((point, i) => (
                <div key={point} className="border-t border-[#0A0F1C]/10 pt-6">
                  <span className="text-xs font-mono text-[#0A0F1C]/30 mb-4 block">0{i + 1}</span>
                  <p className="text-xl md:text-2xl font-light leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SERVICE AREAS STRIP
          ====================================================== */}
      <section className="py-8 bg-[#142038] relative z-20" aria-label="Service areas">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <MapPin size={24} className="text-[#B8973E]" aria-hidden="true" />
              <div>
                <p className="text-white text-base font-medium">Serving across Tamil Nadu</p>
                <p className="text-white/50 text-sm font-light">Chennai · Coimbatore · Madurai · and 9 more districts</p>
              </div>
            </div>
            <Link
              href="/service-areas"
              className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest font-semibold"
            >
              View all areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
          ====================================================== */}
      <section className="py-32 bg-[#FAFAF8] relative z-20">
        <div className="container-site">
          <div className="max-w-4xl border-t border-[#0A0F1C]/10 pt-16">
            <h2 className="font-display text-5xl md:text-7xl text-[#0D1526] tracking-tight leading-[1.05] mb-8">
              Ready to get started?
            </h2>
            <p className="text-[#0A0F1C]/60 text-xl font-light mb-12 max-w-2xl">
              Tell us what you need. Our team will reach out to understand your requirement and coordinate the right service for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#0D1526] text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-[#B8973E] transition-colors duration-500"
              >
                Browse Services <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 border border-[#0D1526] text-[#0D1526] font-medium text-sm tracking-[0.1em] uppercase hover:bg-[#0D1526]/5 transition-colors duration-500"
              >
                Contact Us Directly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
