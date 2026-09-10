'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, ShieldCheck, Target, Sparkles, Gem, Users, MapPin,
  CheckCircle2, Quote, TrendingUp, Building2, Briefcase, Heart,
  Package, Home, Star
} from 'lucide-react'

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const serviceDivisions = [
  {
    icon: Home,
    title: 'Home Care & Personal Support',
    color: 'from-blue-600 to-blue-400',
    items: [
      { name: 'Home Care & Maintenance', desc: 'Routine upkeep, deep cleaning, and specialized property care.' },
      { name: 'People Care & Support', desc: 'Assistance for family routines, elder care support, and personal errand execution.' },
      { name: 'Monthly & Weekly Provisions', desc: 'Wholesale purchase and timely home delivery of high-quality household groceries and essentials.' },
      { name: 'Personal Care Solutions', desc: 'Customized support tailored to your unique individual and family needs.' },
    ]
  },
  {
    icon: Building2,
    title: 'Property, Building & Office Management',
    color: 'from-emerald-600 to-emerald-400',
    items: [
      { name: 'Building & Office Maintenance', desc: 'Complete structural and functional maintenance for residential and commercial premises.' },
      { name: 'Interior Works & Renovation', desc: 'High-end interior design and execution supervised for top-notch quality at direct-cost pricing.' },
      { name: 'Building Demolition & Scrap Collection', desc: 'Safe, compliant demolition services combined with efficient scrap selling and management.' },
      { name: 'Space Selling & Real Estate Assist', desc: 'Professional guidance and management for selling or optimizing physical spaces.' },
    ]
  },
  {
    icon: Briefcase,
    title: 'Logistics, Lifestyle & Corporate Services',
    color: 'from-purple-600 to-purple-400',
    items: [
      { name: 'Packers & Movers', desc: 'Seamless, hassle-free relocation for homes and corporate spaces.' },
      { name: 'Catering & Event Management', desc: 'End-to-end event planning, quality catering control, and flawless execution.' },
      { name: 'Trip & Travel Planning', desc: 'Personalized holiday and business travel itineraries with full concierge support.' },
      { name: 'Business Startup & Office Setup', desc: 'Turnkey setup solutions including physical office layout, equipment procurement, and administrative support.' },
      { name: 'Financial Product Services', desc: 'Expert assistance in navigating insurance, loans, and wealth management tools.' },
    ]
  },
]

const coreValues = [
  { icon: ShieldCheck, title: 'Absolute Trust', desc: 'Every professional in our network is rigorously vetted. Your security and peace of mind come first.' },
  { icon: Gem, title: 'Uncompromising Quality', desc: 'We never settle for good enough — from the materials we source to the final execution.' },
  { icon: Target, title: 'White-Glove Execution', desc: 'We handle the logistics, coordination, and follow-ups. You simply enjoy the result.' },
  { icon: MapPin, title: 'Local Expertise', desc: 'Deep roots across Tamil Nadu mean we understand local nuances and deploy the right talent fast.' },
]

const expansionDistricts = ['Tirunelveli', 'Tuticorin', 'Nagercoil', 'Virudhunagar', 'Chennai', '+ All 38 Districts']

export function AboutContent() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="bg-navy-950 text-white relative overflow-hidden"
        style={{ paddingTop: 'clamp(140px, 15vw, 220px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}
      >
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-navy-800 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy-700 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 opacity-40" />

        <div className="container-site relative z-10">
          <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-5xl">
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-cream-200 text-xs uppercase tracking-widest font-semibold mb-8">
              <Sparkles size={14} className="text-cream-300" />
              ABC ARONTONIO People Service Assist
            </motion.div>
            <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
              Empowering Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-200 to-cream-400">Everyday Life.</span>
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-cream-200/70 text-lg md:text-xl max-w-3xl leading-relaxed">
              Time is our most precious non-renewable resource. At ABC ARONTONIO, our purpose is to give you back your time while delivering uncompromised quality and unmatched value.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── MD Keynote / Opening Remarks ─────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* MD Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                {/* Decorative frame */}
                <div className="absolute -inset-4 rounded-3xl border-2 border-cream-200 -rotate-2" />
                <div className="absolute -inset-4 rounded-3xl bg-cream-100 -rotate-2 -z-10" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-cream-100 aspect-[3/4]">
                  <Image
                    src="/md-antony.png"
                    alt="Antony Brucelin — Managing Director, ABC ARONTONIO"
                    fill
                    unoptimized
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-xl">Antony Brucelin</div>
                    <div className="text-cream-300 text-sm mt-1">Managing Director</div>
                    <div className="text-cream-400 text-xs mt-0.5">ABC ARONTONIO People Service Assist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MD Message */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={STAGGER}
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs uppercase tracking-widest font-semibold mb-6">
                <Star size={12} className="text-navy-500" />
                Managing Director's Message
              </motion.div>

              <motion.div variants={FADE_UP} className="relative">
                <Quote size={48} className="text-cream-200 absolute -top-4 -left-4" />
                <blockquote className="text-2xl md:text-3xl font-display italic text-navy-800 leading-snug pl-6 border-l-4 border-navy-900 mb-8">
                  "Time is our most precious non-renewable resource. At ABC ARONTONIO, our purpose is to give you back your time while delivering uncompromised quality and unmatched value."
                </blockquote>
              </motion.div>

              <motion.div variants={FADE_UP} className="space-y-4 text-navy-600 text-base leading-relaxed">
                <p>
                  Respected guests, esteemed partners, dedicated team members, and valued clients — a very warm welcome to you all.
                </p>
                <p>
                  Today marks a momentous occasion in our journey as we introduce ABC ARONTONIO People Service Assist. In today's fast-paced, high-demand lifestyle, managing daily tasks, household maintenance, and business operations can be overwhelming.
                </p>
                <p>
                  ABC ARONTONIO was born out of a simple yet powerful vision: to be the <strong className="text-navy-800">ultimate support system</strong> for individuals, families, and businesses across Tamil Nadu.
                </p>
              </motion.div>

              <motion.div variants={FADE_UP} className="mt-8 pt-6 border-t border-cream-200">
                <div className="font-bold text-navy-900 text-lg">Antony Brucelin</div>
                <div className="text-navy-500 text-sm">Managing Director, ABC ARONTONIO People Service Assist</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Core Philosophy / Pricing Model ─────────────────── */}
      <section className="bg-navy-950 section-padding text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-800/60 via-navy-950 to-navy-950" />

        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-cream-300 text-xs uppercase tracking-widest font-semibold mb-6">
              <TrendingUp size={12} />
              Our Core Philosophy
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Transparent Pricing. <br className="hidden md:block" />
              <span className="text-cream-300">Zero Hidden Fees.</span>
            </h2>
            <p className="text-cream-200/70 text-lg leading-relaxed">
              Our foundation rests on two key principles: <strong className="text-cream-200">reducing your costs</strong> and <strong className="text-cream-200">delivering superior results</strong>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: '💰',
                title: 'Flat Supervision & Assistance Fee Model',
                desc: 'Unlike traditional agencies or contractors who charge inflated commission percentages, ABC ARONTONIO operates on a unique, transparent flat fee model. We never take percentage cuts from contractors or service providers.'
              },
              {
                icon: '🤝',
                title: 'Every Rupee Saved Goes Back to You',
                desc: 'Every single rupee saved during execution is passed directly back to you. Whether you are present or away, our professional team organizes, supervises, and maintains your routine tasks with absolute integrity and transparency.'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-cream-100">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Values grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-navy-900/50 border border-white/10 p-6 rounded-2xl hover:bg-navy-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                  <value.icon size={20} className="text-cream-300" />
                </div>
                <h3 className="text-base font-bold mb-3">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Divisions ────────────────────────────────── */}
      <section className="bg-cream-50 section-padding border-y border-cream-200">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cream-200 text-navy-700 text-xs uppercase tracking-widest font-semibold mb-6">
              <Package size={12} className="text-navy-500" />
              360° Service Suite
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 tracking-tight mb-6">
              Comprehensive Range of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Multi-Services</span>
            </h2>
            <p className="text-navy-600 text-lg leading-relaxed">
              We take pride in offering a complete, 360-degree suite of personal and corporate assistance solutions, organized into three key service divisions.
            </p>
          </motion.div>

          <div className="space-y-12">
            {serviceDivisions.map((division, divIdx) => (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: divIdx * 0.1 }}
                className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden"
              >
                {/* Division header */}
                <div className={`bg-gradient-to-r ${division.color} p-6 md:p-8 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <division.icon size={24} />
                    </div>
                    <div>
                      <div className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-1">Division {divIdx + 1}</div>
                      <h3 className="text-xl md:text-2xl font-bold">{division.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Services list */}
                <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-cream-100">
                  {division.items.map((item, itemIdx) => (
                    <div
                      key={item.name}
                      className={`p-6 ${itemIdx >= 2 ? 'border-t border-cream-100' : ''} hover:bg-cream-50 transition-colors`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-navy-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-navy-900 mb-1">{item.name}</div>
                          <div className="text-navy-500 text-sm leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Expansion & Strategic Partnerships ──────────────── */}
      <section className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={STAGGER}
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs uppercase tracking-widest font-semibold mb-6">
                <MapPin size={12} className="text-navy-500" />
                Expansion & Partnerships
              </motion.div>
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold text-navy-900 tracking-tight mb-8">
                Growing Across <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">All of Tamil Nadu.</span>
              </motion.h2>
              <motion.div variants={FADE_UP} className="space-y-4 text-navy-600 text-base leading-relaxed">
                <p>
                  Starting our initial operations across <strong className="text-navy-800">Southern Tamil Nadu</strong> — Tirunelveli, Tuticorin, Nagercoil, and Virudhunagar — we are rapidly expanding to Chennai and all 38 districts across Tamil Nadu.
                </p>
                <p>
                  To guarantee top-tier service, we are building strong alliances with skilled technical assistants, verified vendor networks, and strategic business partners.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {expansionDistricts.map((district, i) => (
                  <div
                    key={district}
                    className={`rounded-xl border p-4 text-center font-medium text-sm ${
                      district.startsWith('+')
                        ? 'bg-navy-900 text-cream-100 border-navy-900 col-span-2 sm:col-span-1'
                        : 'bg-cream-50 text-navy-800 border-cream-200'
                    }`}
                  >
                    {district.startsWith('+') ? (
                      <>
                        <div className="text-2xl font-bold text-cream-200 mb-1">38</div>
                        <div className="text-cream-400 text-xs uppercase tracking-wider">Districts & Growing</div>
                      </>
                    ) : (
                      <>
                        <MapPin size={16} className="mx-auto mb-2 text-navy-400" />
                        {district}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Long-Term Relationship Commitment ───────────────── */}
      <section className="bg-cream-50 section-padding border-t border-cream-200">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cream-200 text-navy-700 text-xs uppercase tracking-widest font-semibold mb-8">
              <Heart size={12} className="text-navy-500" />
              Our Commitment
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 tracking-tight mb-8">
              Building Lifelong <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Relationships.</span>
            </h2>

            {/* Quote */}
            <div className="bg-white border border-cream-200 rounded-2xl p-8 md:p-12 mb-10 relative shadow-sm">
              <Quote size={40} className="text-cream-300 absolute top-8 left-8" />
              <blockquote className="text-xl md:text-2xl font-display italic text-navy-700 leading-relaxed relative z-10">
                "Trust is not built overnight; it is earned transaction by transaction, service by service."
              </blockquote>
              <div className="mt-6 text-navy-400 text-sm font-medium">— Antony Brucelin, Managing Director</div>
            </div>

            <p className="text-navy-600 text-lg leading-relaxed mb-8">
              Our ultimate goal is not just one-time engagements, but building lifelong relationships. We measure our success through customer delight and organic word-of-mouth recommendations. When you trust ABC ARONTONIO, you gain a dependable life partner committed to your peace of mind.
            </p>

            <div className="inline-block bg-navy-900 text-cream-200 px-6 py-3 rounded-xl text-sm font-medium italic">
              "Thank you for your faith in us. Let us simplify your life and build a brighter, hassle-free future together!"
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section className="bg-white section-padding border-t border-cream-200">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            {[
              { num: '12+', label: 'Service Categories', icon: Users },
              { num: '38', label: 'Districts Across Tamil Nadu', icon: MapPin },
              { num: '1', label: 'Single Point of Contact', icon: CheckCircle2 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0"
              >
                <div className="text-5xl md:text-7xl font-bold text-navy-900 mb-4 tracking-tighter">{stat.num}</div>
                <div className="flex items-center gap-2 text-navy-600 font-medium uppercase tracking-widest text-sm">
                  <stat.icon size={16} /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="bg-navy-950 section-padding text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-navy-800/60 via-navy-950 to-navy-950" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Let Us Simplify Your Life<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-200 to-cream-400"> Together.</span>
            </h2>
            <p className="text-cream-200/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join individuals and businesses across Tamil Nadu who trust ABC ARONTONIO as their complete life service partner.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white text-navy-900 font-semibold text-sm rounded-xl shadow-lg hover:bg-cream-100 transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white/10 border border-white/20 text-cream-100 font-medium text-sm rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
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
