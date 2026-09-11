import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
      color: '#ffffff'
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: '0', color: '#6366f1' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '16px 0 8px' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', maxWidth: '480px', marginBottom: '24px', lineHeight: '1.6' }}>
        The page you are looking for doesn't exist or has been moved. Explore our free online photo editing tools below.
      </p>
      <Link 
        href="/" 
        style={{
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
