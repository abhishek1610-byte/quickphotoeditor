'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RemoveBackground() {
  const [image, setImage] = useState(null);
  const [processedUrl, setProcessedUrl] = useState('');
  const [tolerance, setTolerance] = useState(30);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImage(url);
        processBackgroundRemoval(img, tolerance);
      };
    }
  };

  const processBackgroundRemoval = (img, tol) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Corner pixel as background reference
    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);

      if (diff < tol * 3) {
        data[i + 3] = 0; // Make transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    setProcessedUrl(canvas.toDataURL('image/png'));
  };

  const handleToleranceChange = (newTol) => {
    setTolerance(newTol);
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => processBackgroundRemoval(img, newTol);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 16px' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#1e293b', marginTop: '16px', marginBottom: '8px' }}>Remove Background</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Remove solid or light backgrounds to get transparent PNGs.</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          style={{ marginBottom: '20px', display: 'block', width: '100%' }}
        />

        {image && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                Color Sensitivity: {tolerance}
              </label>
              <input 
                type="range" 
                min="5" 
                max="80" 
                value={tolerance} 
                onChange={(e) => handleToleranceChange(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {processedUrl && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  border: '1px solid #cbd5e1'
                }}>
                  <img 
                    src={processedUrl} 
                    alt="Transparent Preview" 
                    style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} 
                  />
                </div>

                <a 
                  href={processedUrl} 
                  download="removed-bg.png"
                  style={{ display: 'block', backgroundColor: '#16a34a', color: '#ffffff', textDecoration: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}
                >
                  Download PNG (Transparent)
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
