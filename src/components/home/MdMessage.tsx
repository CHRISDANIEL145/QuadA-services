'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Quote, ArrowRight, MapPin } from 'lucide-react'

export function MdMessage() {
  return (
    <section className="bg-white section-padding border-t border-cream-200 relative overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-cream-100 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/3 opacity-70" />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* MD Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-cream-200 rotate-2" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-cream-100 aspect-[4/5]">
                <Image
                  src="/md-antony.png"
                  alt="Antony Brucelin — Managing Director, ABC ARONTONIO"
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-bold text-lg">Antony Brucelin</div>
                  <div className="text-cream-300 text-sm">Managing Director</div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-navy-900 text-white rounded-2xl p-4 shadow-xl border border-navy-800">
                <MapPin size={16} className="text-cream-300 mb-1" />
                <div className="text-xs font-bold text-cream-200">Tamil Nadu</div>
                <div className="text-[10px] text-cream-400">Expanding Statewide</div>
              </div>
            </div>
          </motion.div>

          {/* Quote & Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <span className="text-navy-500 tracking-wider uppercase text-xs font-semibold mb-5 block">
              A Message From Our MD
            </span>

            <div className="relative mb-8">
              <Quote size={52} className="text-cream-200 absolute -top-3 -left-3 -z-0" />
              <blockquote className="text-2xl md:text-3xl font-display italic text-navy-800 leading-snug relative z-10 pl-4 border-l-4 border-navy-900">
                "Time is our most precious non-renewable resource. At ABC ARONTONIO, our purpose is to give you back your time while delivering uncompromised quality and unmatched value."
              </blockquote>
            </div>

            <p className="text-navy-600 text-base leading-relaxed mb-6">
              ABC ARONTONIO was born out of a simple yet powerful vision: to be the ultimate support system for individuals, families, and businesses across Tamil Nadu. We operate on a unique, transparent <strong className="text-navy-800">Flat Supervision & Assistance Fee Model</strong> — every rupee saved is passed directly back to you.
            </p>

            <p className="text-navy-600 text-base leading-relaxed mb-8">
              Our ultimate goal is not just one-time engagements, but building <strong className="text-navy-800">lifelong relationships</strong>. When you trust ABC ARONTONIO, you gain a dependable life partner committed to your peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-medium text-sm rounded-xl hover:bg-navy-800 transition-all duration-300"
              >
                Read Full Message
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white border border-cream-200 text-navy-700 font-medium text-sm rounded-xl hover:bg-cream-50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
