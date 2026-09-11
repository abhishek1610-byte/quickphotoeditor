 'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function CropPhoto() {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [croppedSize, setCroppedSize] = useState(0);
  const [aspect, setAspect] = useState('free'); // 'free' | '1:1' | '16:9' | '9:16' | '3:4'
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 });

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
        setImageSrc(event.target.result);
        applyCrop(event.target.result, 10, 10, 80, 80);
      };
      reader.readAsDataURL(file);
    }
  };

  const setRatioPreset = (ratioType) => {
    setAspect(ratioType);
    let newW = 80;
    let newH = 80;

    if (ratioType === '1:1') {
      newW = 70;
      newH = 70;
    } else if (ratioType === '16:9') {
      newW = 90;
      newH = 50.6;
    } else if (ratioType === '9:16') {
      newW = 50.6;
      newH = 90;
    } else if (ratioType === '3:4') {
      newW = 60;
      newH = 80;
    }

    const nextBox = { x: 10, y: 10, width: newW, height: newH };
    setCropBox(nextBox);
    if (imageSrc) {
      applyCrop(imageSrc, nextBox.x, nextBox.y, nextBox.width, nextBox.height);
    }
  };

  const applyCrop = (src, xPct, yPct, wPct, hPct) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const startX = (img.width * xPct) / 100;
      const startY = (img.height * yPct) / 100;
      const cropW = (img.width * wPct) / 100;
      const cropH = (img.height * hPct) / 100;

      canvas.width = cropW;
      canvas.height = cropH;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCroppedSize(blob.size);
            setCroppedImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/jpeg',
        0.92
      );
    };
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          Quick Photo Cropper with Social Presets
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          One-click ratio presets for YouTube, Instagram, Stories, and Passport photos with live file size comparison.
        </p>

        {/* Upload Box */}
        {!imageSrc && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>✂️</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select or Drop Image to Crop</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Instant crop & compression</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {/* Live Controls & Sidebar */}
        {imageSrc && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Control Sidebar */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '14px', color: '#e2e8f0' }}>Target Aspect Ratio</h3>

              {/* Social Presets Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                {[
                  { key: '1:1', label: '1:1 Square (Insta/DP)' },
                  { key: '16:9', label: '16:9 (YouTube/Landscape)' },
                  { key: '9:16', label: '9:16 (Reels/TikTok)' },
                  { key: '3:4', label: '3:4 (Passport/Portrait)' }
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setRatioPreset(p.key)}
                    style={{
                      padding: '10px 8px',
                      backgroundColor: aspect === p.key ? '#38bdf8' : '#0f172a',
                      color: aspect === p.key ? '#0f172a' : '#cbd5e1',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Real-time KB Tracker */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: '#38bdf8' }}>Cropped File Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(croppedSize)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={croppedImage}
                  download={`cropped-${aspect}.jpg`}
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
                  {isProcessing ? 'Processing...' : 'Download Crop'}
                </a>
                <button
                  onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                Preview Result ({aspect})
              </div>
              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="Cropped Preview"
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
