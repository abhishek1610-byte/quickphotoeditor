import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: "Photo Resizer",
      desc: "Change image dimensions (width & height) quickly.",
      link: "/resize-image",
      icon: "📐",
    },
    {
      title: "Image Compressor",
      desc: "Reduce image file size (MB to KB) easily.",
      link: "/compress-image",
      icon: "🗜️",
    },
    {
      title: "Add Text to Photo",
      desc: "Write text, captions or watermarks on images.",
      link: "/add-text",
      icon: "✍️",
    },
    {
      title: "Remove Background",
      desc: "Make your image background transparent in one click.",
      link: "/remove-background",
      icon: "✂️",
    },
    {
      title: "Crop Photo",
      desc: "Cut custom ratios like 1:1, 16:9 for social media.",
      link: "/crop-image",
      icon: "🖼️",
    }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ margin: 0, fontSize: '22px', color: '#2563eb' }}>QuickPhotoEditor</h1>
      </header>

      {/* Hero Banner */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '30px', color: '#1e293b', marginBottom: '8px' }}>Fast & Free Online Photo Tools</h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Edit, resize, and compress your photos directly in your browser.</p>
        </div>

        {/* Tools Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {tools.map((tool, idx) => (
            <Link 
              key={idx} 
              href={tool.link} 
              style={{
                textDecoration: 'none',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                display: 'block',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{tool.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0f172a' }}>{tool.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.4' }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
