'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CompressImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState(0.7);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrigSize((file.size / 1024).toFixed(1));
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        compress(event.target.result, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (imageSrc, qualityValue) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const result = canvas.toDataURL('image/jpeg', Number(qualityValue));
      setCompressedUrl(result);

      // Estimate compressed size in KB
      const head = 'data:image/jpeg;base64,';
      const sizeInBytes = Math.round((result.length - head.length) * 3 / 4);
      setCompSize((sizeInBytes / 1024).toFixed(1));
    };
  };

  const handleQualityChange = (e) => {
    const newQuality = e.target.value;
    setQuality(newQuality);
    if (originalImage) {
      compress(originalImage, newQuality);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 16px' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#1e293b', marginTop: '16px', marginBottom: '8px' }}>Image Compressor</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Reduce image file size instantly without losing visible quality.</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          style={{ marginBottom: '20px', display: 'block', width: '100%' }}
        />

        {originalImage && (
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
              Compression Level: {Math.round((1 - quality) * 100)}%
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="0.9" 
              step="0.05"
              value={quality} 
              onChange={handleQualityChange}
              style={{ width: '100%', marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Original Size</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#0f172a' }}>{origSize} KB</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Compressed Size</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#16a34a' }}>{compSize} KB</p>
              </div>
            </div>

            {compressedUrl && (
              <a 
                href={compressedUrl} 
                download="compressed-photo.jpg"
                style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}
              >
                Download Compressed Photo
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
