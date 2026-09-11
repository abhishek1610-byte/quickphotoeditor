 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RemoveBg() {
  const [imageSrc, setImageSrc] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultSize, setResultSize] = useState(0);

  // Background replacement controls
  const [bgType, setBgType] = useState('transparent'); // 'transparent' | 'color'
  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30); // Color match sensitivity
  const [isProcessing, setIsProcessing] = useState(false);

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
        processBackground(event.target.result, bgType, bgColor, tolerance);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert Hex color to RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const processBackground = (src, mode, colorHex, tol) => {
    if (!src) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample background color from top-left pixel (0,0)
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const customBgRgb = hexToRgb(colorHex);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance from corner background
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
        );

        if (dist <= tol * 2.5) {
          if (mode === 'transparent') {
            data[i + 3] = 0; // Transparent
          } else {
            data[i] = customBgRgb.r;
            data[i + 1] = customBgRgb.g;
            data[i + 2] = customBgRgb.b;
            data[i + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // PNG export preserves transparency
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResultSize(blob.size);
            setResultImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/png'
      );
    };
  };

  const updateSettings = (mode, color, tol) => {
    setBgType(mode);
    setBgColor(color);
    setTolerance(tol);
    if (imageSrc) {
      processBackground(imageSrc, mode, color, tol);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          AI Background Remover & Color Replacer
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Create transparent PNG cutouts or change background to solid white/blue for official ID photos.
        </p>

        {!imageSrc && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>✨</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select Photo to Remove Background</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Instant solid/studio background cutout</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {imageSrc && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Sidebar Controls */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '14px', color: '#e2e8f0' }}>Background Settings</h3>

              {/* Mode Selector */}
              <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #334155' }}>
                <button
                  onClick={() => updateSettings('transparent', bgColor, tolerance)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: bgType === 'transparent' ? '#2563eb' : 'transparent',
                    color: bgType === 'transparent' ? '#fff' : '#94a3b8'
                  }}
                >
                  Transparent PNG
                </button>
                <button
                  onClick={() => updateSettings('color', bgColor, tolerance)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: bgType === 'color' ? '#2563eb' : 'transparent',
                    color: bgType === 'color' ? '#fff' : '#94a3b8'
                  }}
                >
                  Solid Color
                </button>
              </div>

              {/* Solid Color Options */}
              {bgType === 'color' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Passport Quick Colors:</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    {[
                      { label: 'White', color: '#ffffff' },
                      { label: 'Passport Blue', color: '#2563eb' },
                      { label: 'Light Grey', color: '#e2e8f0' },
                      { label: 'Red', color: '#dc2626' }
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => updateSettings('color', c.color, tolerance)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          backgroundColor: bgColor === c.color ? '#38bdf8' : '#0f172a',
                          color: bgColor === c.color ? '#0f172a' : '#cbd5e1',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Custom Color:</span>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => updateSettings('color', e.target.value, tolerance)}
                      style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                  </div>
                </div>
              )}

              {/* Edge Tolerance / Sensitivity Slider */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Edge Sensitivity (Tolerance)</span>
                  <strong style={{ color: '#38bdf8' }}>{tolerance}%</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={tolerance}
                  onChange={(e) => updateSettings(bgType, bgColor, Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b' }}>Increase slider if edges are rough or background isn&apos;t fully removed.</span>
              </div>

              {/* Real-time KB Tracker */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#38bdf8' }}>Result PNG Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(resultSize)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={resultImage}
                  download={bgType === 'transparent' ? 'cutout-photo.png' : 'solid-bg-photo.png'}
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
                  {isProcessing ? 'Processing...' : 'Download Image'}
                </a>
                <button
                  onClick={() => { setImageSrc(null); setResultImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview with Chessboard transparency background */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                Cutout Result ({bgType})
              </div>
              <div style={{
                display: 'inline-block',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'repeating-conic-gradient(#334155 0% 25%, #1e293b 0% 50%) 50% / 20px 20px'
              }}>
                {resultImage && (
                  <img
                    src={resultImage}
                    alt="Result Preview"
                    style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
