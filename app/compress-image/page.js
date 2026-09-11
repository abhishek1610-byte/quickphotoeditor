 'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function CompressImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [isProcessing, setIsProcessing] = useState(false);
  const imageRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        compress(event.target.result, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (imageSrc, currentQuality) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Real-time canvas compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setCompressedImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/jpeg',
        currentQuality / 100
      );
    };
  };

  const handleQualityChange = (e) => {
    const newQuality = Number(e.target.value);
    setQuality(newQuality);
    if (originalImage) {
      compress(originalImage, newQuality);
    }
  };

  const reductionPercentage = originalSize
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          Live Image Compressor
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Adjust quality slider to see the reduced file size instantly in real-time.
        </p>

        {/* Upload Box */}
        {!originalImage && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>📁</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select or Drop Image Here</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Supports JPG, PNG, WebP</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {/* Live Controls & Realtime Size Panel */}
        {originalImage && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Control Sidebar */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#e2e8f0' }}>Compression Level</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                  <span>Quality</span>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{quality}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={quality}
                  onChange={handleQualityChange}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Realtime Size Comparison Badge */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#38bdf8' }}>Compressed Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(compressedSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: '#94a3b8' }}>Saved:</span>
                  <strong style={{ color: '#f59e0b' }}>{reductionPercentage}% reduction</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={compressedImage}
                  download="compressed-image.jpg"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    pointerEvents: isProcessing ? 'none' : 'auto',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                >
                  {isProcessing ? 'Calculating...' : 'Download Image'}
                </a>
                <button
                  onClick={() => { setOriginalImage(null); setCompressedImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Live Quality Preview</div>
              {compressedImage && (
                <img
                  src={compressedImage}
                  alt="Live Preview"
                  style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
