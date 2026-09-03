'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const districts = [
  'Chennai',
  'Tirunelveli',
  'Thoothukudi (Tuticorin)',
  'Kanyakumari',
  'Virudhunagar',
  'Tenkasi'
]

export function ServiceAreaMap() {
  return (
    <section className="section-padding bg-cream-100 relative overflow-hidden">
      {/* Background SVG abstract map graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
         <svg className="w-[150vw] md:w-[800px] h-auto" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="300" stroke="#0f172a" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
            <circle cx="400" cy="400" r="200" stroke="#0f172a" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.5" />
            <circle cx="400" cy="400" r="100" stroke="#0f172a" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.8" />
         </svg>
      </div>

      <div className="container-site relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
          
          <div className="flex-1 text-center md:text-left">
            <span className="text-navy-500 tracking-wider uppercase text-xs font-semibold mb-6 block">
              Operational Jurisdictions
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight tracking-tight">
              Strategic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Localization.</span>
            </h2>
            <p className="text-navy-600 text-base md:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
              True excellence requires proximity. We operate exclusively within 6 elite districts in South India to ensure our response times, network quality, and execution standards remain uncompromising.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="grid gap-6">
              {districts.map((district, i) => (
                <motion.div
                  key={district}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                  className="flex items-center gap-6 p-6 md:p-8 bg-white border border-cream-200 rounded-2xl group hover:bg-cream-50 hover:border-navy-300 hover:shadow-xl transition-all duration-500 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center text-cream-300 group-hover:text-navy-900 group-hover:bg-cream-100 group-hover:border-navy-200 transition-all duration-500">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-navy-900 tracking-tight group-hover:text-navy-700 transition-colors duration-500">{district}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
