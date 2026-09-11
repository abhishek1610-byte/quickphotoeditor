import Link from 'next/link';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#cbd5e1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginTop: '20px', marginBottom: '16px' }}>Contact Us</h1>
        <p style={{ lineHeight: 1.7, marginBottom: '24px' }}>
          Have questions, feedback, or feature suggestions? We would love to hear from you.
        </p>

        <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '8px' }}>Email Support</h3>
          <p style={{ fontSize: '15px', color: '#f8fafc', margin: 0 }}>
            contact@quickphotoeditor.com
          </p>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
            We typically respond within 24–48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
