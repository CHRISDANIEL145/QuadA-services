export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for QuadA Services.',
}

export default function PrivacyPage() {
  const lastUpdated = "September 3, 2026";

  return (
    <>
      <div className="bg-cream-50 section-padding border-b border-cream-200" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        <div className="container-site max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 tracking-tight leading-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Policy.</span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">1. Introduction</h2>
              <p>
                At Quad A Life Assist Connect 360°, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our service marketplace platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account.</li>
                <li>Process your transactions and fulfill your service requests.</li>
                <li>Match you with appropriate service professionals in your area.</li>
                <li>Email you regarding your account or order.</li>
                <li>Increase the efficiency and operation of the Site.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">4. Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li><strong>Service Professionals:</strong> When you request a service, we share necessary details with the professionals assigned to fulfill your request.</li>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
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
