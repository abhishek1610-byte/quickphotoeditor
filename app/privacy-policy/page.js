import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#cbd5e1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginTop: '20px', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Last updated: September 2026</p>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>1. Information We Do Not Collect</h2>
          <p>QuickPhotoEditor processes images entirely on the client side inside your browser using HTML5 Canvas. We do not upload, store, or view any of your personal images or files on our servers.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>2. Google AdSense & Cookies</h2>
          <p>We use third-party advertising vendors, including Google, to serve ads when you visit our website. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this website or other websites on the Internet.</p>
          <p style={{ marginTop: '8px' }}>Users may opt out of personalized advertising by visiting Google's Ads Settings or aboutads.info.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>3. Log Files</h2>
          <p>Like standard web platforms, we may collect non-personal analytics data such as browser type, referring pages, and timestamp to improve application performance.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>4. Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        </section>
      </div>
    </div>
  );
}
