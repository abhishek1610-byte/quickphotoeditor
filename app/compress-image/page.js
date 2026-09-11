 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CompressImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [mode, setMode] = useState('manual'); // 'manual' | 'percent'
  const [targetKb, setTargetKb] = useState(50);
  const [quality, setQuality] = useState(70);
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
      const defaultKb = Math.min(Math.round(file.size / 1024 / 2), 100);
      setTargetKb(defaultKb || 50);

      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        compressByQuality(event.target.result, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressByQuality = (imageSrc, currentQuality) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

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

  // Manual Target Size (Iterative Canvas Search)
  const compressToExactKb = (imageSrc, targetSizeInKb) => {
    if (!targetSizeInKb || targetSizeInKb <= 0) return;
    setIsProcessing(true);
    const targetBytes = targetSizeInKb * 1024;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let min = 0.01;
      let max = 1.0;
      let bestBlob = null;
      let iterations = 0;

      const attempt = () => {
        const mid = (min + max) / 2;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setIsProcessing(false);
              return;
            }

            iterations++;
            bestBlob = blob;

            if (Math.abs(blob.size - targetBytes) < 2048 || iterations >= 8) {
              setCompressedSize(blob.size);
              setCompressedImage(URL.createObjectURL(blob));
              setQuality(Math.round(mid * 100));
              setIsProcessing(false);
              return;
            }

            if (blob.size > targetBytes) {
              max = mid;
            } else {
              min = mid;
            }
            attempt();
          },
          'image/jpeg',
          mid
        );
      };

      attempt();
    };
  };

  const handleManualKbChange = (val) => {
    const kb = Number(val);
    setTargetKb(kb);
    if (originalImage && kb > 0) {
      compressToExactKb(originalImage, kb);
    }
  };

  const handleQualityChange = (val) => {
    const q = Number(val);
    setQuality(q);
    if (originalImage) {
      compressByQuality(originalImage, q);
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
          Smart Image Compressor
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Compress photo manually to exact KB limit (e.g. 20KB, 50KB) or use quality sliders.
        </p>

        {!originalImage && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>📁</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select or Drop Image Here</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Supports JPG, PNG, WebP</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {originalImage && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Control Sidebar */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              
              {/* Tab Selector */}
              <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #334155' }}>
                <button
                  onClick={() => setMode('manual')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: mode === 'manual' ? '#2563eb' : 'transparent',
                    color: mode === 'manual' ? '#fff' : '#94a3b8'
                  }}
                >
                  Manual Exact KB
                </button>
                <button
                  onClick={() => setMode('percent')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: mode === 'percent' ? '#2563eb' : 'transparent',
                    color: mode === 'percent' ? '#fff' : '#94a3b8'
                  }}
                >
                  By Quality Slider
                </button>
              </div>

              {/* Mode 1: Manual KB */}
              {mode === 'manual' ? (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
                    Type Exact Target Size (KB):
                  </label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="number"
                      value={targetKb}
                      onChange={(e) => handleManualKbChange(e.target.value)}
                      placeholder="e.g. 50"
                      style={{ flex: 1, padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
                    />
                    <span style={{ alignSelf: 'center', fontSize: '14px', color: '#94a3b8' }}>KB</span>
                  </div>

                  {/* Quick Form Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[20, 50, 100, 200].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleManualKbChange(num)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          backgroundColor: targetKb === num ? '#38bdf8' : '#0f172a',
                          color: targetKb === num ? '#0f172a' : '#cbd5e1',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {num} KB
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Mode 2: Quality Slider */
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                    <span>Quality Level</span>
                    <strong style={{ color: '#38bdf8' }}>{quality}%</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={quality}
                    onChange={(e) => handleQualityChange(e.target.value)}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>
              )}

              {/* Realtime Size Comparison */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#38bdf8' }}>Output File Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(compressedSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: '#94a3b8' }}>Total Saved:</span>
                  <strong style={{ color: '#f59e0b' }}>{reductionPercentage}% smaller</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={compressedImage}
                  download="compressed-photo.jpg"
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
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Live Output Preview</div>
              {compressedImage && (
                <img
                  src={compressedImage}
                  alt="Live Preview"
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
