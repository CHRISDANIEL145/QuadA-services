'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12+', label: 'Service Categories' },
  { value: '50+', label: 'Services Available' },
  { value: '12', label: 'Districts Served' },
  { value: '24/7', label: 'Support Available' },
]

const serviceHighlights = [
  { name: 'Home & Maintenance', icon: '🏠', desc: 'Plumbing, electrical, repairs' },
  { name: 'Cleaning Services', icon: '✨', desc: 'Deep clean, housekeeping' },
  { name: 'Senior Care', icon: '🤝', desc: 'Compassionate assistance' },
  { name: 'Interior Design', icon: '🎨', desc: 'Renovation & styling' },
  { name: 'Real Estate', icon: '🏢', desc: 'Buy, sell, rent assistance' },
  { name: 'Event Services', icon: '🎉', desc: 'End-to-end coordination' },
]

const journeySteps = [
  { step: '01', title: 'Discover', desc: 'Browse our comprehensive service catalogue and find exactly what you need.' },
  { step: '02', title: 'Enquire', desc: 'Submit your requirement. No registration, no payment — just your need.' },
  { step: '03', title: 'Connect', desc: 'Our team reviews your enquiry and connects you with the right professional.' },
  { step: '04', title: 'Coordinate', desc: 'We manage scheduling, follow-up, and every step of service delivery.' },
  { step: '05', title: 'Complete', desc: 'Service delivered. We follow up to ensure your satisfaction.' },
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
  const journeyRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Reduced-motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // SIGNATURE INTERACTION: Scroll-driven service journey
    const steps = stepsRef.current.filter(Boolean)
    if (!steps.length) return

    const ctx = gsap.context(() => {
      // Stagger the steps on scroll with a premium, slower ease
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 30 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, journeyRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ======================================================
          HERO — Immersive, cinematic, deep navy
          ====================================================== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1C]"
        aria-label="Hero section"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #B8973E 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px] bg-[#253969]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px] bg-[#B8973E]"
          aria-hidden="true"
        />

        <div className="container-site relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8973E] animate-pulse" />
              <span className="text-xs text-white/60 tracking-widest uppercase font-medium">
                Professional Services · Tamil Nadu
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-[-0.03em] mb-8"
            >
              Every service,
              <br />
              <span className="italic text-[#B8973E]">coordinated</span>
              <br />
              for you.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              From home maintenance to senior care, interior design to real estate — QuadA Services connects you with trusted professionals across Tamil Nadu. Tell us what you need.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/services"
                id="hero-explore-services"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#B8973E] text-white font-medium text-base rounded-xl hover:bg-[#D4AF5C] transition-all duration-500 hover:shadow-2xl hover:shadow-[#B8973E]/30 hover:-translate-y-1"
              >
                Explore Our Services
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
              </Link>
              <Link
                href="/contact"
                id="hero-send-enquiry"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium text-base rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                Send an Enquiry
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            aria-label="Service statistics"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center px-4 py-5 rounded-2xl bg-white/[0.04] border border-white/[0.07]"
              >
                <div className="font-display text-4xl font-light text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ======================================================
          SERVICES OVERVIEW — Light cream section
          ====================================================== */}
      <section
        className="py-24 bg-[#FAFAF8]"
        aria-labelledby="services-heading"
      >
        <div className="container-site">
          <div className="max-w-2xl mb-16">
            <p className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-3">
              What We Offer
            </p>
            <h2
              id="services-heading"
              className="font-display text-4xl md:text-5xl text-[#0D1526] leading-tight tracking-tight mb-5"
            >
              Services designed
              <br />
              around your life.
            </h2>
            <p className="text-[#6B6254] text-lg leading-relaxed">
              We don't believe in one-size-fits-all. Every service is coordinated around your specific situation, schedule, and requirements.
            </p>
          </div>

            {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {serviceHighlights.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={`/services`}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-[#DDD7CF] hover:border-[#253969]/30 hover:bg-[#0D1526]/[0.02] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0D1526]/5 flex items-center justify-center text-2xl shrink-0 group-hover:bg-[#0D1526]/10 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0D1526] text-base mb-1 group-hover:text-[#253969] transition-colors duration-500">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#6B6254]">{service.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/services"
              id="all-services-link"
              className="inline-flex items-center gap-2 text-[#0D1526] font-medium hover:text-[#B8973E] transition-colors group"
            >
              View all 50+ services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[#DDD7CF]">·</span>
            <span className="text-sm text-[#6B6254]">12 categories available</span>
          </div>
        </div>
      </section>

      {/* ======================================================
          SIGNATURE INTERACTION — The Service Journey
          Scroll-driven GSAP narrative
          ====================================================== */}
      <section
        ref={journeyRef}
        className="py-24 bg-[#0D1526] overflow-hidden"
        aria-labelledby="journey-heading"
      >
        <div className="container-site">
          <div className="max-w-2xl mb-20">
            <p className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-3">
              How It Works
            </p>
            <h2
              id="journey-heading"
              className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5"
            >
              Your service journey,
              <br />
              <span className="italic text-[#B8973E]">step by step.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              From the moment you reach out to the moment the job is done — we're with you at every stage.
            </p>
          </div>

          {/* Journey steps */}
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#253969] via-[#B8973E] to-transparent md:hidden"
              aria-hidden="true"
            />
            <div
              className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#253969] to-transparent"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {journeySteps.map((step, i) => (
                <div
                  key={step.step}
                  ref={(el) => { if (el) stepsRef.current[i] = el }}
                  className="relative flex md:flex-col gap-5 md:gap-4 md:text-center pl-14 md:pl-0"
                >
                  {/* Step number */}
                  <div className="absolute left-0 md:relative md:left-auto w-12 h-12 rounded-full border border-[#253969] bg-[#0A0F1C] flex items-center justify-center shrink-0 md:mx-auto">
                    <span className="text-[#B8973E] text-xs font-mono font-semibold">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/contact"
              id="journey-cta"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#253969] text-white hover:bg-[#253969]/30 hover:border-[#4A6BA8] transition-all duration-300 rounded-xl text-base"
            >
              Start Your Enquiry
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          TRUST SECTION
          ====================================================== */}
      <section
        className="py-24 bg-[#FAFAF8]"
        aria-labelledby="trust-heading"
      >
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-3">
                Why Choose Us
              </p>
              <h2
                id="trust-heading"
                className="font-display text-4xl md:text-5xl text-[#0D1526] leading-tight tracking-tight mb-6"
              >
                Service you can trust.
                <br />
                People who care.
              </h2>
              <p className="text-[#6B6254] text-lg leading-relaxed mb-10">
                We're not a marketplace where you're left to coordinate alone. Every enquiry is personally reviewed by our team, who ensure the right professional is matched to your specific need.
              </p>
              <Link
                href="/about"
                id="trust-about-link"
                className="inline-flex items-center gap-2 text-[#0D1526] font-medium hover:text-[#B8973E] transition-colors group"
              >
                Learn about our approach
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#DDD7CF]"
                  >
                    <CheckCircle2 size={18} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-[#0D1526] text-sm font-medium leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SERVICE AREAS STRIP
          ====================================================== */}
      <section
        className="py-16 bg-[#142038]"
        aria-label="Service areas"
      >
        <div className="container-site">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-[#B8973E]" aria-hidden="true" />
              <div>
                <p className="text-white text-sm font-medium">Serving across Tamil Nadu</p>
                <p className="text-white/40 text-xs">Chennai · Coimbatore · Madurai · and 9 more districts</p>
              </div>
            </div>
            <Link
              href="/service-areas"
              className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
            >
              View all areas
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
          ====================================================== */}
      <section
        className="py-24 bg-[#FAFAF8]"
        aria-labelledby="cta-heading"
      >
        <div className="container-site text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <h2
              id="cta-heading"
              className="font-display text-4xl md:text-5xl text-[#0D1526] tracking-tight leading-tight mb-6"
            >
              Ready to get started?
            </h2>
            <p className="text-[#6B6254] text-lg mb-10">
              Tell us what you need. Our team will reach out to understand your requirement and coordinate the right service for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                id="bottom-cta-services"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#0D1526] text-white font-medium text-base rounded-xl hover:bg-[#1C2D4F] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0D1526]/30"
              >
                Browse Services
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
              <Link
                href="/contact"
                id="bottom-cta-contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-[#DDD7CF] text-[#0D1526] font-medium text-base rounded-xl hover:border-[#0D1526] transition-all duration-500 hover:-translate-y-1"
              >
                Contact Us Directly
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
