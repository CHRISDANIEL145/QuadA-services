'use client'

import { motion } from 'framer-motion'
import { Briefcase, Key, Gem, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: Briefcase,
    title: 'Consultation & Audit',
    desc: 'An initial private consultation to audit your current lifestyle logistics and identify immediate and long-term optimization opportunities.'
  },
  {
    icon: Gem,
    title: 'Bespoke Strategy',
    desc: 'We architect a personalized management framework, assigning a dedicated concierge director to oversee your portfolio of needs.'
  },
  {
    icon: Key,
    title: 'Frictionless Execution',
    desc: 'Our network is deployed on your behalf. From estate management to global logistics, execution happens invisibly and flawlessly.'
  },
  {
    icon: ShieldCheck,
    title: 'Continuous Optimization',
    desc: 'We do not just maintain; we elevate. Regular reviews ensure our service continually adapts to your evolving trajectory.'
  }
]

export function HowItWorks() {
  return (
    <section className="section-padding bg-white border-t border-cream-200 relative">
      <div className="container-site">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-navy-500 tracking-wider uppercase text-xs font-semibold mb-6 block">
            The Engagement
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight tracking-tight">
            An orchestration <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">of precision.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-stretch">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
              className="relative p-8 md:p-10 group rounded-3xl bg-cream-100/60 hover:bg-cream-100 border border-cream-200 hover:border-navy-200 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(100%-1rem)] w-[calc(100%+2rem)] h-px bg-navy-200/30 z-0" />
              )}
              
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-cream-200 group-hover:border-navy-900 flex items-center justify-center text-navy-900 mb-8 transition-colors duration-500 shadow-sm group-hover:shadow-md">
                <step.icon size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
              </div>
              
              <div className="mt-auto">
                <div className="text-navy-400 text-xs tracking-[0.2em] uppercase mb-4 group-hover:text-navy-600 transition-colors duration-500 font-semibold">
                  Phase {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-navy-800 transition-colors duration-500 tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-base text-navy-600 leading-relaxed group-hover:text-navy-700 transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
