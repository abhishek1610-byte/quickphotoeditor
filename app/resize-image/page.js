'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function ResizeImage() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resizedUrl, setResizedUrl] = useState('');
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImage(url);
        setWidth(img.width);
        setHeight(img.height);
        imgRef.current = img;
      };
    }
  };

  const handleResize = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = Number(width);
    canvas.height = Number(height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(imgRef.current, 0, 0, Number(width), Number(height));
    const result = canvas.toDataURL('image/jpeg', 0.9);
    setResizedUrl(result);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 16px' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#1e293b', marginTop: '16px', marginBottom: '8px' }}>Photo Resizer</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Upload an image to resize its dimensions.</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          style={{ marginBottom: '20px', display: 'block', width: '100%' }}
        />

        {image && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Width (px)</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Height (px)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button 
              onClick={handleResize}
              style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
            >
              Resize Image
            </button>
          </div>
        )}

        {resizedUrl && (
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
            <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '12px' }}>Photo Resized Successfully!</p>
            <a 
              href={resizedUrl} 
              download="resized-photo.jpg"
              style={{ display: 'inline-block', backgroundColor: '#16a34a', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px' }}
            >
              Download Resized Photo
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
