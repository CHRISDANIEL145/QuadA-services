'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroCTA() {
  return (
    <section className="section-padding bg-white relative overflow-hidden border-t border-cream-200">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-cream-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cream-50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="container-site relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-100 text-navy-700 text-sm font-medium mb-8">
            <Sparkles size={14} className="text-navy-500" /> Start your journey today
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-navy-900 mb-6 leading-[1.1] tracking-tight">
            Beyond service. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Absolute mastery.</span>
          </h2>
          
          <p className="text-navy-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a network of individuals who refuse to compromise on their time, quality, or peace of mind. Experience seamless service coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/services" 
              className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-navy-900 text-white font-medium text-sm rounded-xl shadow-lg shadow-navy-900/10 hover:bg-navy-800 transition-all duration-300"
            >
              Explore Portfolios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/contact" 
              className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white border border-cream-200 text-navy-700 font-medium text-sm rounded-xl hover:bg-cream-50 hover:border-cream-200 transition-all duration-300"
            >
              Request Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
