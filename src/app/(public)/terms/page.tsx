export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for QuadA Services.',
}

export default function TermsPage() {
  const lastUpdated = "September 3, 2026";

  return (
    <>
      <div className="bg-cream-50 section-padding border-b border-cream-200" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        <div className="container-site max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 tracking-tight leading-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Service.</span>
          </h1>
          <p className="text-lg text-navy-600/80">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
      <div className="bg-white section-padding">
        <div className="container-site max-w-4xl">
          <div className="space-y-12 text-navy-800 leading-relaxed text-lg">
            
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Quad A Life Assist Connect 360° ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, mobile application, or service related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
                <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">4. Services and Pricing</h2>
              <p>
                We make every effort to display as accurately as possible the services, descriptions, and pricing available on the Site. However, we do not guarantee that the descriptions, pricing, or other content available on the Site are accurate, complete, reliable, current, or error-free. We reserve the right to modify or discontinue any service at any time for any reason without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">5. Limitation of Liability</h2>
              <p>
                In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site or our services, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">6. Modifications and Interruptions</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">7. Contact Information</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <div className="bg-cream-50 p-6 rounded-2xl border border-cream-200 mt-4">
                <p className="font-semibold text-navy-900">Quad A Life Assist Connect 360°</p>
                <p>Tirunelveli, Tamil Nadu, India</p>
                <p>Email: bruce_mba07@yahoo.co.in</p>
                <p>Phone: +91 96559 55777</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
