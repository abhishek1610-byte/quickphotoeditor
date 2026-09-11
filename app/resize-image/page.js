 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResizeImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [estimatedSize, setEstimatedSize] = useState(0);
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [mode, setMode] = useState('percentage'); // 'percentage' | 'pixels'
  const [maintainAspect, setMaintainAspect] = useState(true);
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
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setOriginalImage(event.target.result);
          setOrigDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
          setPercentage(100);
          generateResize(event.target.result, img.width, img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const generateResize = (imageSrc, targetW, targetH) => {
    if (!targetW || !targetH || targetW <= 0 || targetH <= 0) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setEstimatedSize(blob.size);
            setResizedImage(URL.createObjectURL(blob));
            setIsProcessing(false);
          }
        },
        'image/jpeg',
        0.9
      );
    };
  };

  // Percentage slider change
  const handlePercentageChange = (pct) => {
    const newPct = Number(pct);
    setPercentage(newPct);
    const newW = Math.round((origDimensions.width * newPct) / 100);
    const newH = Math.round((origDimensions.height * newPct) / 100);
    setWidth(newW);
    setHeight(newH);
    if (originalImage) {
      generateResize(originalImage, newW, newH);
    }
  };

  // Pixel Width change
  const handleWidthChange = (val) => {
    const newW = Number(val);
    setWidth(newW);
    let newH = height;
    if (maintainAspect && origDimensions.width > 0) {
      newH = Math.round((newW / origDimensions.width) * origDimensions.height);
      setHeight(newH);
    }
    if (origDimensions.width > 0) {
      setPercentage(Math.round((newW / origDimensions.width) * 100));
    }
    if (originalImage) {
      generateResize(originalImage, newW, newH);
    }
  };

  // Pixel Height change
  const handleHeightChange = (val) => {
    const newH = Number(val);
    setHeight(newH);
    let newW = width;
    if (maintainAspect && origDimensions.height > 0) {
      newW = Math.round((newH / origDimensions.height) * origDimensions.width);
      setWidth(newW);
    }
    if (origDimensions.height > 0) {
      setPercentage(Math.round((newH / origDimensions.height) * 100));
    }
    if (originalImage) {
      generateResize(originalImage, newW, newH);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '30px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to All Tools
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>
          Image Resizer (Pixels & Percentage)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Resize image dimensions by percentage slider or exact width/height with live size tracking.
        </p>

        {/* Upload Box */}
        {!originalImage && (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #334155', borderRadius: '16px', cursor: 'pointer', backgroundColor: '#1e293b' }}>
            <span style={{ fontSize: '32px', marginBottom: '8px' }}>📏</span>
            <span style={{ fontWeight: '600', color: '#38bdf8' }}>Select or Drop Image to Resize</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>JPG, PNG, WebP supported</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        )}

        {/* Live Controls & Sidebar */}
        {originalImage && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
              
              {/* Tab Selector: Percentage vs Pixels */}
              <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #334155' }}>
                <button
                  onClick={() => setMode('percentage')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: mode === 'percentage' ? '#2563eb' : 'transparent',
                    color: mode === 'percentage' ? '#fff' : '#94a3b8'
                  }}
                >
                  By Percentage (%)
                </button>
                <button
                  onClick={() => setMode('pixels')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: mode === 'pixels' ? '#2563eb' : 'transparent',
                    color: mode === 'pixels' ? '#fff' : '#94a3b8'
                  }}
                >
                  By Pixels (W×H)
                </button>
              </div>

              {/* Mode 1: Percentage Controls */}
              {mode === 'percentage' && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span>Scale Percentage</span>
                    <strong style={{ color: '#38bdf8', fontSize: '15px' }}>{percentage}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={percentage}
                    onChange={(e) => handlePercentageChange(e.target.value)}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    {[25, 50, 75, 80, 100].map((val) => (
                      <button
                        key={val}
                        onClick={() => handlePercentageChange(val)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          backgroundColor: percentage === val ? '#38bdf8' : '#0f172a',
                          color: percentage === val ? '#0f172a' : '#cbd5e1',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode 2: Pixel Controls */}
              {mode === 'pixels' && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Width (px)</label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Height (px)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                    />
                    Maintain aspect ratio
                  </label>
                </div>
              )}

              {/* Realtime Size & Dimensions Panel */}
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original Dimension:</span>
                  <strong style={{ color: '#e2e8f0' }}>{origDimensions.width} × {origDimensions.height} px</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>New Dimension:</span>
                  <strong style={{ color: '#38bdf8' }}>{width} × {height} px</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#94a3b8' }}>Original File Size:</span>
                  <strong style={{ color: '#e2e8f0' }}>{formatSize(originalSize)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: '#38bdf8' }}>Estimated Output Size:</span>
                  <strong style={{ color: '#34d399' }}>{formatSize(estimatedSize)}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={resizedImage}
                  download={`resized-${width}x${height}.jpg`}
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
                  {isProcessing ? 'Updating...' : 'Download Resized'}
                </a>
                <button
                  onClick={() => { setOriginalImage(null); setResizedImage(null); }}
                  style={{ padding: '12px', backgroundColor: '#334155', border: 'none', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Visual Preview */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                Live Resized Output ({width} × {height} px)
              </div>
              {resizedImage && (
                <img
                  src={resizedImage}
                  alt="Resized Preview"
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
     {/* SEO & Informational Content Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto 0', padding: '30px 20px', borderTop: '1px solid #334155', color: '#cbd5e1' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
          Free Online Image Resizer – Change Dimensions Easily
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
          Quick Photo Editor's image resizer lets you scale images to exact pixel dimensions or percentages instantly. Perfect for preparing photos for social media banners, passports, resumes, or web publishing without blurry distortion.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          How to Resize Images
        </h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li>Select and upload your picture.</li>
          <li>Enter your desired width and height, or lock the aspect ratio for automatic scaling.</li>
          <li>Check the visual preview to ensure your dimensions fit perfectly.</li>
          <li>Click Download to retrieve your resized image.</li>
        </ol>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Key Features
        </h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '24px' }}>
          <li><strong>Aspect Ratio Lock:</strong> Keep images proportionate without stretching or squishing.</li>
          <li><strong>Local Browser Engine:</strong> Zero server uploads ensures 100% privacy and lightning-fast resizing.</li>
          <li><strong>Multiple Formats:</strong> Fully compatible with PNG, JPG, and WebP.</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginTop: '24px', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h3>
        <div style={{ lineHeight: '1.7' }}>
          <p><strong>Will resizing make my image blurry?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            Downscaling preserves sharp detail. Upscaling past original dimensions can cause blur, so keeping aspect ratio locked provides optimal quality.
          </p>

          <p><strong>Is there any limit on file dimensions?</strong></p>
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            No, you can set custom pixel dimensions suitable for banners, profile pictures, or standard print formats.
          </p>
        </div>
      </section>    
    </div>
  );
}
