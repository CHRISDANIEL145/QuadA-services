'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    title: 'Absolute Discretion',
    desc: 'Confidentiality is our cornerstone. Your privacy, lifestyle, and estate are protected with bank-level discretion and zero-knowledge protocols.'
  },
  {
    title: 'Global Standards, Local Expertise',
    desc: 'Operating with Fortune 100 efficiency while maintaining deep, localized networks. We bring global excellence to regional execution.'
  },
  {
    title: 'White-Glove Execution',
    desc: 'Every detail is meticulously planned and flawlessly executed. We do not just solve problems; we anticipate them before they arise.'
  },
  {
    title: 'A Single Point of Truth',
    desc: 'Your dedicated concierge handles all vendor management, negotiations, and logistics. One point of contact for absolute peace of mind.'
  },
  {
    title: 'Uncompromising Quality',
    desc: 'Our partners are vetted through rigorous standards. Only the top 1% of service providers are invited into our exclusive network.'
  }
]

export function WhyQuadA() {
  return (
    <section className="section-padding bg-cream-100 relative border-t border-cream-200">
      <div className="container-site">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left: Sticky Header */}
          <div className="relative">
            <div className="lg:sticky top-32">
              <span className="text-navy-500 tracking-wider uppercase text-xs font-semibold mb-6 block">
                The Quad A Standard
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-8 leading-tight tracking-tight">
                Uncompromising <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Excellence.</span>
              </h2>
              <p className="text-navy-600 text-base md:text-lg max-w-lg leading-relaxed">
                We do not cater to the masses. We serve the discerning few who value their time above all else. Experience frictionless management of your estate, family, and investments.
              </p>
            </div>
          </div>

          {/* Right: Scrolling Reasons */}
          <div className="flex flex-col gap-12 mt-10 lg:mt-0">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="group relative pl-10 border-l-2 border-cream-200 hover:border-navy-900 transition-colors duration-500 py-2"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-[-6px] w-[10px] h-[10px] rounded-full bg-cream-200 group-hover:bg-navy-900 transition-colors duration-500" />
                
                <div className="text-cream-300 font-medium text-[10px] uppercase mb-3 group-hover:text-navy-600 transition-colors duration-300">
                  Pillar {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-3 tracking-tight group-hover:text-navy-900 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-navy-600 leading-relaxed text-sm md:text-base group-hover:text-navy-700 transition-colors duration-300">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
