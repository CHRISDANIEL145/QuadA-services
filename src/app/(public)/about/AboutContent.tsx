'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Target, Sparkles, Gem, Users, MapPin, CheckCircle2 } from 'lucide-react'

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export function AboutContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-cream-50 section-padding border-b border-cream-200 relative overflow-hidden" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cream-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container-site relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={STAGGER}
            className="max-w-4xl"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cream-200 text-navy-700 text-xs uppercase tracking-widest font-semibold mb-8 shadow-sm">
              <Sparkles size={14} className="text-navy-500" /> The Quad A Standard
            </motion.div>
            <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-navy-900 tracking-tight leading-[1.1] mb-8">
              Redefining <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Service Excellence.</span>
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-navy-600 text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed">
              We provide a single point of contact for all your service needs. From property maintenance to personal care, we bring trust and quality to every doorstep across Tamil Nadu.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={STAGGER}
            >
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-navy-900 tracking-tight mb-8">
                One point. <br /> Every service.
              </motion.h2>
              <motion.div variants={FADE_UP} className="space-y-6 text-navy-600 text-base md:text-lg leading-relaxed">
                <p>
                  Quad A Services was founded on a simple premise: managing life's various services shouldn't require managing a dozen different vendors, contractors, and agencies. 
                </p>
                <p>
                  We act as your dedicated service concierge. Whether you need reliable home maintenance, specialized senior care, or complex real estate solutions, we coordinate everything seamlessly through our vetted network of professionals.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-cream-100 flex items-center justify-center border border-cream-200"
            >
               {/* Note: I'll use a placeholder for now, since we don't have luxury-hero.jpg locally. But framer motion works well. */}
              <div className="text-navy-900/20 w-32 h-32">
                <ShieldCheck className="w-full h-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-white text-2xl font-display font-medium tracking-wide">
                  "Trusted coordination, absolute peace of mind."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <section className="bg-navy-950 section-padding text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-navy-900 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container-site relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Quad A Philosophy</h2>
            <p className="text-cream-200/80 text-lg leading-relaxed">
              We don't just provide services; we deliver an experience grounded in trust, precision, and unwavering quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Absolute Trust",
                desc: "Every professional in our network is rigorously vetted. We prioritize your security and peace of mind above all else."
              },
              {
                icon: Gem,
                title: "Uncompromising Quality",
                desc: "From the materials we source to the execution of the final detail, we never settle for 'good enough'."
              },
              {
                icon: Target,
                title: "White-Glove Execution",
                desc: "We handle the logistics, coordination, and follow-ups. You simply make the request and enjoy the result."
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                desc: "Deep roots across Tamil Nadu ensure we understand local nuances and can dispatch the right talent quickly."
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-navy-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-navy-800/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  <value.icon size={24} className="text-cream-300" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Scale */}
      <section className="bg-cream-50 section-padding border-b border-cream-200">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            {[
              { num: "12+", label: "Service Categories", icon: Users },
              { num: "5", label: "Major Districts Covered", icon: MapPin },
              { num: "1", label: "Single Point of Contact", icon: CheckCircle2 }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0"
              >
                <div className="text-5xl md:text-7xl font-bold text-navy-900 mb-4 tracking-tighter">
                  {stat.num}
                </div>
                <div className="flex items-center gap-2 text-navy-600 font-medium uppercase tracking-widest text-sm">
                  <stat.icon size={16} /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white section-padding relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cream-100 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
        
        <div className="container-site relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 tracking-tight">
              Ready to experience <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">absolute mastery?</span>
            </h2>
            <p className="text-navy-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join a network of individuals who refuse to compromise on their time, quality, or peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/services" 
                className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-navy-900 text-white font-medium text-sm rounded-xl shadow-lg shadow-navy-900/10 hover:bg-navy-800 transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white border border-cream-200 text-navy-700 font-medium text-sm rounded-xl hover:bg-cream-50 hover:border-cream-200 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
