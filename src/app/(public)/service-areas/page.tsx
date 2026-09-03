import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Clock, Users, Map } from 'lucide-react'
import { ServiceAreaMap } from '@/components/home/ServiceAreaMap'

export const metadata: Metadata = {
  title: 'Service Areas',
  description: 'Areas covered by QuadA Services. We coordinate premium services across 6 elite districts in South India.',
}

const advantages = [
  {
    icon: Map,
    title: 'Deep Local Knowledge',
    description: 'Our roots in these districts mean we understand the local nuances, vendors, and geography perfectly.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Partners',
    description: 'We rigorously vet every service provider in our network to ensure uncompromising quality.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Proximity allows us to respond and deploy services quickly when you need them most.',
  },
  {
    icon: Users,
    title: 'Dedicated Coordination',
    description: 'A single point of contact manages your service from end-to-end, locally.',
  },
]

export default function ServiceAreasPage() {
  return (
    <>
      {/* Animated Header */}
      <div className="bg-cream-50 section-padding border-b border-cream-200 relative overflow-hidden" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cream-100 to-transparent opacity-50 pointer-events-none" />
        
        <div className="container-site relative z-10 animate-fade-up">
          <span className="text-navy-500 tracking-wider uppercase text-xs font-semibold mb-6 block">
            Our Coverage
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-900 tracking-tight leading-tight mb-6">
            Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Areas.</span>
          </h1>
          <p className="text-navy-600 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
            We operate exclusively within 6 elite districts in South India to ensure our response times, network quality, and execution standards remain uncompromising.
          </p>
        </div>
      </div>

      {/* Strategic Localization Map Component */}
      <ServiceAreaMap />

      {/* The Local Advantage */}
      <div className="bg-white section-padding border-t border-cream-200">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 tracking-tight">
              The QuadA <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Advantage</span>
            </h2>
            <p className="text-navy-600 text-lg leading-relaxed">
              Why our focused regional presence guarantees a better service experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div 
                  key={adv.title} 
                  className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-2xl bg-cream-50 border border-cream-200 hover:bg-white hover:border-navy-200 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-cream-200 flex items-center justify-center shrink-0 group-hover:bg-cream-100 group-hover:border-navy-200 transition-all duration-500 shadow-sm">
                    <Icon size={24} className="text-navy-700 group-hover:text-navy-900 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3 tracking-tight group-hover:text-navy-700 transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed text-sm md:text-base">
                      {adv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy-900 section-padding relative overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
           <svg className="w-[150vw] md:w-[800px] h-auto" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="400" cy="400" r="300" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
              <circle cx="400" cy="400" r="200" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
           </svg>
        </div>

        <div className="container-site relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to request a service?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are in Tirunelveli or Chennai, our local coordinators are ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-900 font-semibold rounded-lg hover:bg-cream-100 transition-colors w-full sm:w-auto shadow-lg"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
