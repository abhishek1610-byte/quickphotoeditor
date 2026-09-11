import Link from 'next/link';

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#cbd5e1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginTop: '20px', marginBottom: '16px' }}>Terms of Service</h1>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Last updated: September 2026</p>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>1. Acceptance of Terms</h2>
          <p>By accessing and using QuickPhotoEditor, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>2. Use of Service</h2>
          <p>QuickPhotoEditor provides free web-based image manipulation tools. You agree to use these tools only for lawful purposes and in accordance with these Terms.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>3. Disclaimer of Warranties</h2>
          <p>The tools and services are provided on an &apos;as is&apos; and &apos;as available&apos; basis. While we strive for optimal accuracy and speed, we do not warrant that the service will be uninterrupted or error-free.</p>
        </section>

        <section style={{ marginBottom: '20px', lineHeight: 1.6 }}>
          <h2 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '8px' }}>4. Intellectual Property</h2>
          <p>You retain full rights and ownership over any image files processed through our utilities. We do not claim any copyright on user files.</p>
        </section>
      </div>
    </div>
  );
}
