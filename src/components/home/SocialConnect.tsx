'use client'

import { motion } from 'framer-motion'
import { Youtube, Instagram, Facebook, Linkedin, Send } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    icon: Youtube,
    label: 'YouTube',
    handle: '@abrucelinsahayaraj3898',
    href: 'https://youtube.com/@abrucelinsahayaraj3898?si=BJNUJGDInLC2Smf_',
    color: 'hover:text-[#FF0000] hover:border-[#FF0000]/30',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@antonybrucelin',
    href: 'https://www.instagram.com/antonybrucelin?utm_source=qr&stkn=MWt1ZnJqejJsYXc0ZA==',
    color: 'hover:text-[#E1306C] hover:border-[#E1306C]/30',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    handle: 'ABC ARONTONIO',
    href: 'https://www.facebook.com/share/19UKGn3QzU/',
    color: 'hover:text-[#1877F2] hover:border-[#1877F2]/30',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'ABC ARONTONIO',
    href: 'https://www.linkedin.com/in/abc-arontonio-people-service-assist-company-04aba973?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/30',
  },
  {
    icon: Send,
    label: 'Telegram',
    handle: '@ABCARONTONIO',
    href: 'https://t.me/ABCARONTONIO',
    color: 'hover:text-[#2AABEE] hover:border-[#2AABEE]/30',
  },
]

const CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function SocialConnect() {
  return (
    <section
      className="bg-[#0D1526] section-padding-sm border-t border-white/5"
      aria-label="Follow us on social media"
    >
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={CONTAINER}
        >
          <motion.div variants={ITEM} className="text-center mb-10">
            <p className="text-xs text-white/40 uppercase tracking-[0.25em] font-semibold mb-3">
              Stay Connected
            </p>
            <h2 className="text-2xl md:text-3xl font-display text-white leading-snug">
              Follow Our Journey
            </h2>
          </motion.div>

          <motion.div
            variants={ITEM}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ABC ARONTONIO on ${label} — ${handle}`}
                className={`
                  group flex items-center gap-3 px-5 py-3 rounded-xl
                  border border-white/10 bg-white/5
                  text-white/60 transition-all duration-300
                  hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40
                  ${color}
                `}
              >
                <Icon
                  size={18}
                  className="shrink-0 transition-colors duration-300"
                />
                <span className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-0.5">
                    {label}
                  </span>
                  <span className="text-sm font-medium">{handle}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
