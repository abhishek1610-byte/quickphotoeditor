'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function AddText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('My Watermark');
  const [fontSize, setFontSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [downloadUrl, setDownloadUrl] = useState('');
  const imgRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImage(url);
        imgRef.current = img;
        generatePreview(img, text, fontSize, color, posX, posY);
      };
    }
  };

  const generatePreview = (img, currentText, currentSize, currentColor, x, y) => {
    if (!img) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    ctx.font = `${currentSize}px sans-serif`;
    ctx.fillStyle = currentColor;
    ctx.textBaseline = 'top';
    ctx.fillText(currentText, (x / 100) * img.width, (y / 100) * img.height);

    setDownloadUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  const updateCanvas = (newText, newSize, newColor, newX, newY) => {
    if (imgRef.current) {
      generatePreview(imgRef.current, newText, newSize, newColor, newX, newY);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 16px' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#1e293b', marginTop: '16px', marginBottom: '8px' }}>Add Text to Photo</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Add watermarks or captions directly onto your images.</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          style={{ marginBottom: '20px', display: 'block', width: '100%' }}
        />

        {image && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Text</label>
              <input 
                type="text" 
                value={text} 
                onChange={(e) => { setText(e.target.value); updateCanvas(e.target.value, fontSize, color, posX, posY); }}
                style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Font Size (px)</label>
                <input 
                  type="number" 
                  value={fontSize} 
                  onChange={(e) => { setFontSize(e.target.value); updateCanvas(text, e.target.value, color, posX, posY); }}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ width: '80px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Color</label>
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => { setColor(e.target.value); updateCanvas(text, fontSize, e.target.value, posX, posY); }}
                  style={{ width: '100%', height: '38px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Horizontal Position (%): {posX}%</label>
              <input 
                type="range" 
                min="0" 
                max="90" 
                value={posX} 
                onChange={(e) => { setPosX(e.target.value); updateCanvas(text, fontSize, color, e.target.value, posY); }}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Vertical Position (%): {posY}%</label>
              <input 
                type="range" 
                min="0" 
                max="90" 
                value={posY} 
                onChange={(e) => { setPosY(e.target.value); updateCanvas(text, fontSize, color, posX, e.target.value); }}
                style={{ width: '100%' }}
              />
            </div>

            {downloadUrl && (
              <div>
                <img src={downloadUrl} alt="Preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '16px' }} />
                <a 
                  href={downloadUrl} 
                  download="watermarked-image.jpg"
                  style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}
                >
                  Download Edited Photo
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
