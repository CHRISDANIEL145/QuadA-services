'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCategory as Category } from '@/types'
import { ArrowRight } from 'lucide-react'

interface CategoryDiscoveryProps {
  categories: Category[]
}

export function CategoryDiscovery({ categories }: CategoryDiscoveryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="section-padding bg-white relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container-site mb-12 md:mb-16 relative z-10 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 tracking-tight">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Categories</span>
        </h2>
        <p className="text-navy-600 text-base md:text-lg max-w-2xl leading-relaxed text-center">
          Comprehensive management across every dimension of your life. Tailored solutions for modern living.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="container-site relative z-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, i) => {
            const gradients = [
              "from-navy-900 to-navy-700",
              "from-cream-200 to-cream-300",
              "from-navy-700 to-navy-500",
              "from-cream-100 to-cream-200",
              "from-navy-800 to-navy-600",
              "from-navy-950 to-navy-800",
            ];
            const fallbackGradient = gradients[i % gradients.length];
            
            return (
              <Link 
                key={cat.id} 
                href={`/services?category=${cat.slug}`}
                className="group relative flex flex-col bg-cream-50 border border-cream-200 rounded-2xl overflow-hidden hover:border-cream-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-cream-200 overflow-hidden">
                  {cat.image_url ? (
                     <Image src={cat.image_url} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  ) : (
                    <>
                      <Image 
                        src={`/images/categories/${cat.slug}.jpg`} 
                        alt={cat.name} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-gradient');
                          if (fallback) {
                            (fallback as HTMLElement).style.opacity = '1';
                            fallback.classList.remove('hidden');
                          }
                        }}
                      />
                      <div className={`fallback-gradient hidden absolute inset-0 w-full h-full bg-gradient-to-br ${fallbackGradient} group-hover:scale-105 transition-transform duration-700 ease-out`} />
                    </>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-navy-700 transition-colors duration-300">
                      {cat.name}
                    </h3>
                  <div className="w-8 h-8 rounded-full border border-cream-200 group-hover:border-navy-900 group-hover:bg-navy-900 flex items-center justify-center text-cream-300 group-hover:text-white transition-all duration-300">
                    <ArrowRight size={14} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                <p className="text-navy-600 text-sm leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  )
}