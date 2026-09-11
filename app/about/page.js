import Link from 'next/link';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#cbd5e1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginTop: '20px', marginBottom: '16px' }}>About QuickPhotoEditor</h1>
        
        <p style={{ lineHeight: 1.7, marginBottom: '20px' }}>
          Welcome to QuickPhotoEditor! We are dedicated to providing fast, reliable, and privacy-focused online photo editing tools. Whether you need to compress large files, crop pictures for social platforms, remove solid backgrounds, or resize image dimensions, our platform gets it done instantly.
        </p>

        <h2 style={{ fontSize: '20px', color: '#f8fafc', marginTop: '24px', marginBottom: '12px' }}>Our Mission</h2>
        <p style={{ lineHeight: 1.7, marginBottom: '20px' }}>
          Traditional online tools often require users to upload sensitive personal photos to distant servers. Our mission is to modernize web image editing by running processing tasks entirely on the client side inside the browser, safeguarding privacy while eliminating server queue waiting times.
        </p>
      </div>
    </div>
  );
}
