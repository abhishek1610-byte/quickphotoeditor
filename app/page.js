 import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: 'Resize Image',
      desc: 'Change exact dimensions in pixels or percentage without losing clarity.',
      link: '/resize-image',
      badge: 'Popular',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      icon: '📐'
    },
    {
      title: 'Image Compressor',
      desc: 'Compress JPG, PNG, and WebP files up to 80% to speed up your website.',
      link: '/compress-image',
      badge: 'Ultra Fast',
      gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      icon: '⚡'
    },
    {
      title: 'Crop Photo',
      desc: 'Instantly crop pictures for Instagram, YouTube, Facebook, and passports.',
      link: '/crop-photo',
      badge: 'Social Ready',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
      icon: '✂️'
    },
    {
      title: 'Remove Background',
      desc: 'Create clean transparent PNG cutouts instantly with color sensitivity.',
      link: '/remove-bg',
      badge: 'AI Powered',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      icon: '✨'
    },
    {
      title: 'Add Text to Photo',
      desc: 'Add watermarks, titles, memes, and branded typography effortlessly.',
      link: '/add-text',
      badge: 'Creative',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      icon: '✍️'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation Bar (Crucial for AdSense) */}
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0b1120', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🎨</span>
            <span style={{ fontWeight: '800', fontSize: '20px', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              QuickPhotoEditor
            </span>
          </div>
          <nav style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#94a3b8' }}>
            <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
            <Link href="#tools" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tools</Link>
            <Link href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</Link>
            <Link href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '60px 20px', textAlign: 'center', background: 'radial-gradient(circle at top, #1e1b4b 0%, #0f172a 70%)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>
            ✨ 100% Free & Browser-Based Image Toolkit
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: '900', lineHeight: 1.2, marginBottom: '20px', background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Professional Image Editing, Made Fast & Effortless
          </h1>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 36px' }}>
            Edit, compress, crop, and remove backgrounds with zero installation. All image processing happens securely inside your browser without uploading your sensitive data to cloud servers.
          </p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#e2e8f0', textAlign: 'center' }}>
          Featured Photo Utilities
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px' }}>
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                textDecoration: 'none',
                transition: 'transform 0.2s, border-color 0.2s',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: tool.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
                    {tool.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#cbd5e1', backgroundColor: '#334155', padding: '4px 10px', borderRadius: '6px' }}>
                    {tool.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {tool.desc}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '13px', fontWeight: '700' }}>
                Launch Tool <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AdSense Value Section: Why Choose Us */}
      <section id="about" style={{ backgroundColor: '#0b1120', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px', color: '#f1f5f9' }}>
            Why Millions Trust QuickPhotoEditor
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px' }}>
            <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>100% Client-Side Privacy</h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                Images never leave your device. All calculations, compression, and conversions happen inside browser memory.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>Zero Server Delay</h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                No waiting in server queues or uploading heavy MB files. Results are rendered instantly with HTML5 Canvas.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>💎</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>Completely Free</h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                No sign-up required, no hidden paywalls, and no subscription fees. Unrestricted access forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Value Section: FAQ Accordion / Content */}
      <section id="faq" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', textAlign: 'center', marginBottom: '32px', color: '#f1f5f9' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '18px 22px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
              Do you store or upload my photos?
            </h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              No. Our web application runs fully on client-side technology. Your pictures are loaded directly into browser cache and never transferred to any remote servers.
            </p>
          </div>
          <div style={{ padding: '18px 22px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
              What file formats are supported?
            </h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              We support standard web graphic formats including JPG, JPEG, PNG, and WebP across all available utilities.
            </p>
          </div>
          <div style={{ padding: '18px 22px', borderRadius: '12px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
              Is there any limit on image size or quantity?
            </h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              There is no daily usage limit. You can process as many images as you need without creating an account.
            </p>
          </div>
        </div>
      </section>

      {/* Footer (AdSense Compliance: Legal Links) */}
      <footer style={{ borderTop: '1px solid #1e293b', backgroundColor: '#0b1120', padding: '36px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
            © {new Date().getFullYear()} QuickPhotoEditor. All rights reserved. Free online image manipulation utility.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#94a3b8' }}>
            <Link href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Us</Link>
            <Link href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
