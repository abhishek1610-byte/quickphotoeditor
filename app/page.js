 import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: 'Resize Image',
      desc: 'Change width and height of any image easily.',
      link: '/resize-image',
      badge: 'Popular'
    },
    {
      title: 'Image Compressor',
      desc: 'Reduce file size quickly without losing quality.',
      link: '/compress-image',
      badge: 'Fast'
    },
    {
      title: 'Add Text to Photo',
      desc: 'Add captions, titles or watermark easily.',
      link: '/add-text',
      badge: 'Editor'
    },
    {
      title: 'Remove Background',
      desc: 'Make background transparent in one click.',
      link: '/remove-bg',
      badge: 'AI Tool'
    },
    {
      title: 'Crop Photo',
      desc: 'Crop to 1:1, 16:9 or custom sizes for social media.',
      link: '/crop-photo',
      badge: 'Essential'
    }
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
          Fast & Free Online Photo Tools
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '40px' }}>
          Edit, compress, crop, and optimize your images in seconds directly in your browser.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {tools.map((tool) => (
            <Link 
              key={tool.title} 
              href={tool.link}
              style={{
                display: 'block',
                textAlign: 'left',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 'bold', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '4px', marginBottom: '12px' }}>
                {tool.badge}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>
                {tool.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
